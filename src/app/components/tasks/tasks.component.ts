import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';
import { TaskItemComponent } from '../task-item/task-item.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { DialogComponent } from '../dialog/dialog.component';
import { ToastComponent } from '../toast/toast.component';
import { ToastService } from '../../services/toast.service';
import { SortOption, UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, AddTaskComponent, EditTaskComponent, DialogComponent, ToastComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  taskToDelete!: Task;
  taskToEdit: Task | null = null;
  showDialog: boolean = false;
  sortOption: SortOption = { name: 'dateAdded', direction: 'desc' };
  subscription!: Subscription;

  constructor(private taskService: TaskService, private toastService: ToastService, private uiService: UiService) {
    this.subscription = this.uiService.getSortOption().subscribe((option) => {
      this.sortOption = option;
      this.sortTasks();
    });
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.sortTasks();
    });
  }

  sortTasks() {
    this.tasks = [...this.tasks].sort((a, b) => {
      let comparison = 0

      switch (this.sortOption.name) {
        case "dateAdded":
          comparison = (new Date(b.dateAdded || 0).getTime() || 0) - (new Date(a.dateAdded || 0).getTime() || 0)
          break
        case "dueDate":
          comparison = (new Date(a.day).getTime() || 0) - (new Date(b.day).getTime() || 0)
          break
        case "priority":
          const priorityOrder = { high: 1, medium: 2, low: 3 } // @ts-ignore
          comparison = (priorityOrder[a.priority] || 0) - (priorityOrder[b.priority] || 0)
          break
      }

      return this.sortOption.direction === "asc" ? comparison * -1 : comparison
    })
  }

  toggleDone(task: Task) {
    task.done = !task.done;
    this.taskService.updateTaskDone(task).subscribe();
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => {
      this.tasks.push(task)
      this.sortTasks();
    });
  }

  onEditTask(task: Task) {
    this.taskToEdit = task;
  }

  editTask(task: Task) {
    this.taskService.editTask(task).subscribe(() => {
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index !== -1) {
        this.tasks[index] = task;
      }
      this.taskToEdit = null;
      this.sortTasks();
    });
  }

  onDialog(task: Task) {
    this.showDialog = true;
    this.taskToDelete = task;
  }

  onConfirm(confirmed: boolean) {
    if (confirmed) {
      this.deleteTask(this.taskToDelete);
    }
    this.showDialog = false;
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => (this.tasks = this.tasks.filter((t) => t.id !== task.id)));
    this.toastService.showToast('Task has been deleted', () => this.undoDelete(task));
  }

  undoDelete(task: Task) {
    this.taskService.addTask(task).subscribe((task) => {
      this.tasks.push(task)
      this.sortTasks();
    });
  }
}
