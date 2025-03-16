import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { Task } from '../../Task';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule, ButtonComponent],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {
  @Input() taskToEdit: Task | null = null;
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();
  text!: string;
  day!: string;
  priority!: string;
  done: boolean = false;
  dateAdded!: Date;
  showEditTask!: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggleEdit().subscribe((value) => (this.showEditTask = value));
  }

  resetForm() {
    this.text = '';
    this.day = '';
    this.priority = '';
    this.done = false;
  }

  ngOnChanges() {
    if (this.taskToEdit) {
      this.text = this.taskToEdit.text;
      this.day = this.taskToEdit.day;
      this.priority = this.taskToEdit.priority;
      this.done = this.taskToEdit.done;
      this.dateAdded = this.taskToEdit.dateAdded;
    }
    else {
      this.resetForm();
    }
  }

  onSubmit() {
    if (!this.text) {
      alert('Please add a task!');
      return;
    }

    const task: Task = {
      text: this.text,
      day: this.day,
      priority: this.priority,
      done: this.done,
      id: this.taskToEdit ? this.taskToEdit.id : undefined,
      dateAdded: this.dateAdded
    };

    this.onEditTask.emit(task);
    this.uiService.closeEditTask();
  }

  cancelEdit() {
    this.uiService.closeEditTask();
  }
}
