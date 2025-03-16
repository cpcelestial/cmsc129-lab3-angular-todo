import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { SortOption } from '../../services/ui.service';

@Component({
  selector: 'app-sort-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sort-task.component.html',
  styleUrl: './sort-task.component.css'
})
export class SortTaskComponent {
  @Input() sortOption: SortOption = { name: 'dateAdded', direction: 'desc' };
  @Output() sortChange = new EventEmitter<string>();

  sortOptions = [
    { value: 'dateAdded_desc', label: 'Date Added (Newest First)' },
    { value: 'dateAdded_asc', label: 'Date Added (Oldest First)' },
    { value: 'dueDate_desc', label: 'Due Date (Earliest First)' },
    { value: 'dueDate_asc', label: 'Due Date (Latest First)' },
    { value: 'priority_desc', label: 'Priority (High to Low)' },
    { value: 'priority_asc', label: 'Priority (Low to High)' },
  ];

  get selectedValue(): string {
    return `${this.sortOption.name}_${this.sortOption.direction}`;
  }

  onSortChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.sortChange.emit(select.value);
  }
}
