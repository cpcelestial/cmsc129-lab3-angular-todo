import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

export interface SortOption {
  name: string;
  direction: "asc" | "desc";
}

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddTask: boolean = false;
  private subjectAdd = new Subject<boolean>();
  private showEditTask: boolean = false;
  private subjectEdit = new Subject<boolean>();
  private subjectSort = new BehaviorSubject<SortOption>({
    name: 'dateAdded',
    direction: 'desc',
  });

  constructor() { }

  onToggleAdd(): Observable<boolean> {
    return this.subjectAdd.asObservable();
  }

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.subjectAdd.next(this.showAddTask);
  }

  openEditTask(): void {
    this.showEditTask = true;
    this.subjectEdit.next(this.showEditTask);
  }

  closeEditTask(): void {
    this.showEditTask = false;
    this.subjectEdit.next(this.showEditTask);
  }

  onToggleEdit(): Observable<boolean> {
    return this.subjectEdit.asObservable();
  }

  getSortOption(): Observable<SortOption> {
    return this.subjectSort.asObservable()
  }

  setSortOption(option: string): void {
    const [name, direction] = option.split("_")

    this.subjectSort.next({
      name,
      direction: direction as "asc" | "desc",
    })
  }
}
