import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expences-request',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './expences-request.component.html',
  styleUrls: ['./expences-request.component.css']
})
export class ExpencesRequestComponent {
  constructor(private router: Router) {}

  expenseRequests = [
    { requester: 'Jane Doe', category: 'Cleaning', amount: '₹4500', date: '2025-08-18', status: 'Pending' },
    { requester: 'John Smith', category: 'Decoration', amount: '₹2200', date: '2025-08-19', status: 'Approved' },
    { requester: 'Alice Brown', category: 'Food', amount: '₹7800', date: '2025-08-20', status: 'Rejected' },
  ];

  // Modal state
  isConfirmModalOpen = false;
  confirmMessage = '';
  confirmCallback: (() => void) | null = null;

  openAddExpenseRequestModal() {
    this.router.navigate(['/dashboard/add-expences-request']);
    console.log('Open Add Expense Request Modal');
  }

  openConfirmModal(action: 'approve' | 'reject', request: any) {
    this.confirmMessage =
      action === 'approve'
        ? 'Are you sure you want to approve this request?'
        : 'Are you sure you want to reject this request?';
    this.confirmCallback = () => {
      if (action === 'approve') {this.approveRequest(request);}
      if (action === 'reject') {this.rejectRequest(request);}
    };
    this.isConfirmModalOpen = true;
  }

  closeConfirmModal() {
    this.isConfirmModalOpen = false;
    this.confirmMessage = '';
    this.confirmCallback = null;
  }

  confirmAction() {
    if (this.confirmCallback) {this.confirmCallback();}
    this.closeConfirmModal();
  }

  approveRequest(request: any) {
    request.status = 'Approved';
    console.log('Approved:', request);
    // Add your API call here
  }

  rejectRequest(request: any) {
    request.status = 'Rejected';
    console.log('Rejected:', request);
    // Add your API call here
  }

  viewRequest(request: any) {
    console.log('Viewing request:', request);
  }
}
