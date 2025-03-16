import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { Task } from '../../Task';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter;
  text!: string;
  day!: string;
  priority!: string;
  done: boolean = false;
  showAddTask!: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggleAdd().subscribe((value) => {
      if (value == false) {
        this.resetForm();
      }
      this.showAddTask = value;
    });
  }

  resetForm() {
    this.text = '';
    this.day = '';
    this.priority = '';
    this.done = false;
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
      dateAdded: new Date()
    };

    this.onAddTask.emit(task);
    this.resetForm();
  }
}
