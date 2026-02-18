import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface ToastMessage {
  text: string;
  type: 'success' | 'error';
}
@Injectable({
  providedIn: 'root'
})

export class ToastService {
  showError(arg0: string) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
  
  private messageSubject = new BehaviorSubject<ToastMessage | null>(null);
  message$ = this.messageSubject.asObservable();

  show(text: string, type: 'success' | 'error' = 'success') {
    this.messageSubject.next({ text, type });

    setTimeout(() => {
      this.messageSubject.next(null);
    }, 3000);
  }

}
