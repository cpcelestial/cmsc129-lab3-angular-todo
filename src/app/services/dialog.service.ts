import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private subject = new Subject<boolean>();

  onConfirmation(): Observable<any> {
    return this.subject.asObservable();
  }

  confirm() {
    this.subject.next(true);
  }

  cancel() {
    this.subject.next(true);
  }
}
