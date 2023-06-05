import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHomeworkComponent } from './create-homework.component';

describe('CreateHomeworkComponent', () => {
  let component: CreateHomeworkComponent;
  let fixture: ComponentFixture<CreateHomeworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHomeworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
