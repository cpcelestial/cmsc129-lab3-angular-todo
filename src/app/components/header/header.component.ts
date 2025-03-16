import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { SortTaskComponent } from '../sort-task/sort-task.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { SortOption, UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, SortTaskComponent, AddTaskComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title: string = 'To Do List';
  sortOption: SortOption = { name: 'dateAdded', direction: 'desc' };
  showAddTask: boolean = false;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggleAdd().subscribe((value) => (this.showAddTask = value)),
      this.uiService.getSortOption().subscribe((value) => (this.sortOption = value));
  }

  toggleAddTask() {
    this.uiService.toggleAddTask();
  }

  onSortChange(option: string) {
    this.uiService.setSortOption(option);
  }
}
