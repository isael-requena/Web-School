import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { HomeworkService } from '../../services/homework.service';

import { HomeworkInterface } from '../../interfaces/Homework'

@Component({
  selector: 'app-homework',
  templateUrl: './homework.page.html',
  styleUrls: ['./homework.page.scss'],
})
export class HomeworkComponent implements OnInit {

  @Output() updateEmit = new EventEmitter()
  @Input() item: HomeworkInterface | undefined;
  @Input() title: string | undefined;
  @Input() id: number | undefined;


  constructor(
    private homeworkService: HomeworkService
  ) { }

  ngOnInit() { }

  onLabelClick($event: { preventDefault: () => void; }) {
    $event.preventDefault();
    console.log('clcick');
  }

  public activeDoneEvent() {
    if (this.item) {
      this.item.homework_done = this.item.homework_done ? 0 : 1
      // console.log(this.item)
      let startValue: any = '' + this.item.homework_start_date
      let endValue: any = '' + this.item.homework_end_date
      const homework: HomeworkInterface = {
        homework_id: this.item.homework_id,
        homework_title: this.item.homework_title,
        homework_description: this.item.homework_description,
        homework_done: this.item.homework_done,
        homework_start_date: this.formatDateSql(startValue),
        homework_end_date: this.formatDateSql(endValue),
        school_subject: this.item.school_subject
      }
      // console.log(homework)
      this.homeworkService.updateHomework(homework).then((res: any) => {
        console.log(res)
        this.updateEmit.emit(res)
      })
    }
  }

  formatDateSql(fecha: Date) {
    let stringDate = '' + fecha, iT = stringDate.indexOf('T'), iz = stringDate.indexOf('.'),
    time = stringDate.slice(iT + 1, iz), date = stringDate.slice(0, iT);  return date + ' ' + time
  }
}
