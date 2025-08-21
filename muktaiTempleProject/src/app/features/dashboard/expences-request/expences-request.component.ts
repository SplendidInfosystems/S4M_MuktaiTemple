import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expences-request',
  standalone: true,
  imports: [TranslateModule,CommonModule],
  templateUrl: './expences-request.component.html',
  styleUrl: './expences-request.component.css'
})
export class ExpencesRequestComponent {
  constructor(private router: Router) {}
    expenseRequests = [
    {
      requester: 'Jane Doe',
      category: 'Cleaning',
      amount: '₹4500',
      date: '2025-08-18',
      status: 'Pending',
    },
    {
      requester: 'John Smith',
      category: 'Decoration',
      amount: '₹2200',
      date: '2025-08-19',
      status: 'Approved',
    },
    {
      requester: 'Alice Brown',
      category: 'Food',
      amount: '₹7800',
      date: '2025-08-20',
      status: 'Rejected',
    },
  ];

  openAddExpenseRequestModal() {
    this.router.navigate(['/dashboard/add-expences-request']);
    console.log('Open Add Expense Request Modal');
  }

  approveRequest(request: any) {
    request.status = 'Approved';
  }

  rejectRequest(request: any) {
    request.status = 'Rejected';
  }

  viewRequest(request: any) {
    console.log('Viewing request:', request);
  }

}
