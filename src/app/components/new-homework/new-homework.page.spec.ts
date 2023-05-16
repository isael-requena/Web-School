import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewHomeworkPage } from './new-homework.page';

describe('NewHomeworkPage', () => {
  let component: NewHomeworkPage;
  let fixture: ComponentFixture<NewHomeworkPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewHomeworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
