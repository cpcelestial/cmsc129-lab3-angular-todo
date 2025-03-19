import { Component, type OnInit, type OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Subscription } from "rxjs"
import { Toast, ToastService } from "../../services/toast.service"
import { trigger, state, style, transition, animate } from "@angular/animations"
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleCheck,
  faCircleXmark,
  faTriangleExclamation,
  faCircleInfo,
  faXmark
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-toast",
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: "./toast.component.html",
  styleUrl: "./toast.component.css",
  animations: [
    trigger("toastAnimation", [
      state(
        "void",
        style({
          transform: "translateY(100%)",
          opacity: 0,
        }),
      ),
      state(
        "visible",
        style({
          transform: "translateY(0)",
          opacity: 1,
        }),
      ),
      transition("void => visible", animate("200ms ease-out")),
      transition("visible => void", animate("150ms ease-in")),
    ]),
  ],
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = []
  subscription!: Subscription
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;
  faTriangleExclamation = faTriangleExclamation;
  faCircleInfo = faCircleInfo;
  faXmark = faXmark;

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

  getToastIcon(type: Toast['type']) {
    switch (type) {
      case 'success':
        return this.faCircleCheck;
      case 'error':
        return this.faCircleXmark;
      case 'warning':
        return this.faTriangleExclamation;
      case 'info':
      default:
        return this.faCircleInfo;
    }
  }

  getIconColor(type: Toast['type']): string {
    switch (type) {
      case 'success':
        return 'green';
      case 'error':
        return 'maroon';
      case 'warning':
        return 'gold';
      case 'info':
      default:
        return 'royalblue';
    }
  }
}