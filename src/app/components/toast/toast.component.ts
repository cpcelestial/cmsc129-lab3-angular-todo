import { Component, type OnInit, type OnDestroy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Subscription } from 'rxjs'
import { Toast, ToastService } from '../../services/toast.service'
import { trigger, state, style, transition, animate } from '@angular/animations'

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  animations: [
    trigger('toastAnimation', [
      state(
        'void',
        style({
          transform: 'translateY(100%)',
          opacity: 0,
        }),
      ),
      state(
        'visible',
        style({
          transform: 'translateY(0)',
          opacity: 1,
        }),
      ),
      transition('void => visible', animate('200ms ease-out')),
      transition('visible => void', animate('150ms ease-in')),
    ]),
  ],
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  subscription!: Subscription;

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.subscription = this.toastService.getToasts().subscribe((toasts) => {
      this.toasts = toasts
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  dismiss(id: string): void {
    this.toastService.dismiss(id)
  }

  executeAction(toast: Toast): void {
    if (toast.action && toast.action.callback) {
      toast.action.callback()
      this.dismiss(toast.id)
    }
  }

  getIconClass(type: Toast['type']): string {
    switch (type) {
      case 'success':
        return 'check-circle'
      case 'error':
        return 'x-circle'
      case 'warning':
        return 'alert-triangle'
      case 'info':
      default:
        return 'info'
    }
  }
}

