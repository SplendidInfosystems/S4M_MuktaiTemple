import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ExpenseRequest } from '../../../core/models/interface-model';
import { DonationService } from '../../../core/services/donation/donation.service';
import { ToastService } from '../../../core/services/toast/toast.service';

@Component({
  selector: 'app-president-approvals',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './president-approvals.component.html',
  styleUrl: './president-approvals.component.css'
})
export class PresidentApprovalsComponent {

  constructor(private expenseService: DonationService, private toast:ToastService) {

  }


  requests: ExpenseRequest[] = [];
  selectedRequest!: ExpenseRequest;

  showConfirm = false;
  confirmType: 'approve' | 'reject' | null = null;

  ngOnInit(): void {
    this.loadPendingRequests();
  }
  loadPendingRequests() {
    this.expenseService.getRequests('accepted')
      .subscribe({
        next: (res: any) => {
        this.toast.show('president Approval List show successfully', 'success');

          if (res.success && Array.isArray(res.data)) {
            this.requests = res.data;
          } else {
            this.requests = [];
          }
        },
        error: (err) => {
          console.error(err);
          this.requests = [];
         this.toast.showError('Failed to load pending requests');

        }
      });
  }


  openConfirm(type: 'approve' | 'reject', request: ExpenseRequest) {
    this.confirmType = type;
    this.selectedRequest = request;
    this.showConfirm = true;
  }

  confirmAction() {
    if (!this.selectedRequest) return;

    const status = this.confirmType === 'approve'
      ? 'accepted'
      : 'rejected';

    this.expenseService.updateStatus(
      String(this.selectedRequest.request_id),
      status
    )
      .subscribe({
        next: () => {
          this.loadPendingRequests();
        },
        error: (err) => {
          console.error(err);
        }
      });

    this.showConfirm = false;
  }

}
