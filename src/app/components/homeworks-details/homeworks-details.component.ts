import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HomeworkInterface } from '../../interfaces/Homework';
import { DateFormatService } from '../../services/date-format.service';
import { HomeworkService } from '../../services/homework.service';

@Component({
  selector: 'app-homeworks-details',
  templateUrl: './homeworks-details.component.html',
  styleUrls: ['./homeworks-details.component.scss'],
})
export class HomeworksDetailsComponent  implements OnInit {
  @Output() closeEmit = new EventEmitter<boolean>();
  @Output() updateEmit = new EventEmitter();
  @Input() homework: HomeworkInterface;
  @Input() userId: number;
  @Input() isTeacher: boolean;

  constructor(
    public dateFormatService: DateFormatService,
    private homeworkService: HomeworkService,
  ) { }

  ngOnInit() {}

  onCloseEvent() {
    this.closeEmit.emit(false);
  }

  public activeDoneEvent() {
    if (this.homework) {
      this.homework.status = this.homework.status === "COMPLETED" ? "IN PROGRESS" : "COMPLETED";
      let startValue: any = '' + this.homework.start_date
      let endValue: any = '' + this.homework.end_date
      const homework: HomeworkInterface = {
        id: this.homework.id,
        title: this.homework.title,
        description: this.homework.description,
        status: this.homework.status,
        start_date: this.dateFormatService.formatDateSql(startValue),
        end_date: this.dateFormatService.formatDateSql(endValue),
        school_subject: this.homework.school_subject
      }
      this.homeworkService.updateHomework(homework, this.userId).then((res: HomeworkInterface) => {
        this.updateEmit.emit(res)
      })
    }
  }

}
