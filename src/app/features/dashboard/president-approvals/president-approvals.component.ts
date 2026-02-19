import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ExpenseRequest } from '../../../core/models/interface-model';
import { DonationService } from '../../../core/services/donation/donation.service';
import { ToastService } from '../../../core/services/toast/toast.service';
import { LoaderService } from '../../../core/services/loader/loader.service';

@Component({
  selector: 'app-president-approvals',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './president-approvals.component.html',
  styleUrl: './president-approvals.component.css'
})
export class PresidentApprovalsComponent implements OnInit {

  constructor(
    private expenseService: DonationService,
    private toast: ToastService,
    private loader: LoaderService
  ) {}

  requests: ExpenseRequest[] = [];
  selectedRequest!: ExpenseRequest;

  showConfirm = false;
  confirmType: 'approve' | 'reject' | null = null;

  ngOnInit(): void {
    this.loadPendingRequests();
  }

  // ================= LOAD REQUESTS =================
  loadPendingRequests() {
    this.loader.show();
    this.expenseService.getRequests('pending').subscribe({
      next: (res) => {
        if (res.success && Array.isArray(res.data)) {
          this.requests = res.data;
        } else {
          this.requests = [];
        }
      },
      error: (err) => {
        console.error(err);
        this.toast.showError('Failed to load requests');
        this.requests = [];
      }
    });
  }

  // ================= OPEN CONFIRM MODAL =================
  openConfirm(type: 'approve' | 'reject', request: ExpenseRequest) {
    this.confirmType = type;
    this.selectedRequest = request;
    this.showConfirm = true;
  }

  // ================= CONFIRM ACTION =================
  confirmAction() {
    if (!this.selectedRequest) return;

    const status = this.confirmType === 'approve'
      ? 'accepted'
      : 'rejected';

    this.expenseService.updateStatus(
      this.selectedRequest.request_id,
      status
    ).subscribe({
      next: () => {
        this.toast.show('Status updated successfully', 'success');

        // remove updated request instantly (optimistic UI)
        this.requests = this.requests.filter(
          r => r.request_id !== this.selectedRequest.request_id
        );
      },
      error: (err) => {
        console.error(err);
        this.toast.showError('Failed to update status');
      }
    });

    this.showConfirm = false;
  }
}
