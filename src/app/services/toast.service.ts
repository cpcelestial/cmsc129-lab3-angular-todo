import { Injectable } from '@angular/core'
import { BehaviorSubject, type Observable } from 'rxjs'

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  action?: {
    label: string
    callback: () => void
  }
  duration?: number
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts = new BehaviorSubject<Toast[]>([])

  getToasts(): Observable<Toast[]> {
    return this.toasts.asObservable()
  }

  show(toast: Omit<Toast, 'id'>): string {
    const id = this.generateId()
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration || 5000,
    }

    this.toasts.next([...this.toasts.value, newToast])

    if (newToast.duration) {
      setTimeout(() => this.dismiss(id), newToast.duration)
    }

    return id
  }

  showToast(message: string, undoCallback: () => void): string {
    return this.show({
      message,
      type: 'error',
      action: {
        label: 'Undo',
        callback: () => {
          undoCallback()
        },
      },
      duration: 7000
    })
  }

  dismiss(id: string): void {
    this.toasts.next(this.toasts.value.filter((toast) => toast.id !== id))
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9)
  }
}

