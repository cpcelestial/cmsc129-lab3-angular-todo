import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortTaskComponent } from './sort-task.component';

describe('SortTaskComponent', () => {
  let component: SortTaskComponent;
  let fixture: ComponentFixture<SortTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
