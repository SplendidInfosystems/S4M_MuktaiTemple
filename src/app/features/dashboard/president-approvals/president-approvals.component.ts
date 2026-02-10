import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-president-approvals',
  standalone: true,
  imports: [TranslateModule,CommonModule],
  templateUrl: './president-approvals.component.html',
  styleUrl: './president-approvals.component.css'
})
export class PresidentApprovalsComponent {

 
  showConfirm = false;
  confirmType: 'approve' | 'reject' | null = null;

  openConfirm(type: 'approve' | 'reject') {
    this.confirmType = type;
    this.showConfirm = true;
  }

  confirmAction() {
    if (this.confirmType === 'approve') {
      console.log('Approved');
    } else {
      console.log('Rejected');
    }

    this.showConfirm = false;
  }
}
