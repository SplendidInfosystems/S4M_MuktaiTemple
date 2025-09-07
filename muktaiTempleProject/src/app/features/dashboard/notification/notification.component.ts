import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

  notifications = [
  {
    id: 1,
    title: 'NOTIFICATIONS.FESTIVAL_TITLE',
    message: 'NOTIFICATIONS.FESTIVAL_MESSAGE',
    date: '2025-09-05',
    type: 'event'
  },
  {
    id: 2,
    title: 'NOTIFICATIONS.TEMPLE_TITLE',
    message: 'NOTIFICATIONS.TEMPLE_MESSAGE',
    date: '2025-09-03',
    type: 'info'
  },
  {
    id: 3,
    title: 'NOTIFICATIONS.GENERAL_TITLE',
    message: 'NOTIFICATIONS.GENERAL_MESSAGE',
    date: '2025-09-01',
    type: 'alert'
  },
  {
    id: 4,
    title: 'NOTIFICATIONS.DONATION_TODAY_TITLE',
    message: 'NOTIFICATIONS.DONATION_TODAY_MESSAGE',
    date: '2025-09-05',
    type: 'donation'
  },
  {
    id: 5,
    title: 'NOTIFICATIONS.DONATION_REMINDER_TITLE',
    message: 'NOTIFICATIONS.DONATION_REMINDER_MESSAGE',
    date: '2025-09-04',
    type: 'donation'
  },
  {
    id: 6,
    title: 'NOTIFICATIONS.EXPENSE_REQUEST_TITLE',
    message: 'NOTIFICATIONS.EXPENSE_REQUEST_MESSAGE',
    date: '2025-09-05',
    type: 'expense'
  },
  {
    id: 7,
    title: 'NOTIFICATIONS.FESTIVAL_EXPENSE_TITLE',
    message: 'NOTIFICATIONS.FESTIVAL_EXPENSE_MESSAGE',
    date: '2025-09-06',
    type: 'expense'
  }
];

}
