import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { HomeworkService } from '../../services/homework.service';

import { HomeworkInterface } from '../../interfaces/Homework'

@Component({
  selector: 'app-homework',
  templateUrl: './homework.page.html',
  styleUrls: ['./homework.page.scss'],
})
export class HomeworkComponent implements OnInit {

  @Output() showModalEmit = new EventEmitter<HomeworkInterface>();
  @Output() updateEmit = new EventEmitter();
  @Output() deleteEmit = new EventEmitter<HomeworkInterface>();
  @Input() item: HomeworkInterface | undefined;
  @Input() title: string | undefined;
  @Input() id: number | undefined;


  constructor(
    private homeworkService: HomeworkService
  ) {

  }

  ngOnInit() { }

  onLabelClick($event: any) {
    $event.preventDefault();
    this.showModalEmit.emit(this.item)
  }
  onDeleteClick($event:any) {
    $event.preventDefault();
    this.deleteEmit.emit(this.item)
  }

  public activeDoneEvent() {
    if (this.item) {
      this.item.homework_done = this.item.homework_done ? 0 : 1
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
      this.homeworkService.updateHomework(homework).then((res: HomeworkInterface) => {
        // let element = document.getElementById(`item_${res.homework_id}`)
        // element?.classList.add(res.homework_done ?  'fadeOutDown' : 'fadeOutUp')
        this.updateEmit.emit(res)
      })
    }
  }

  formatDateSql(fecha: Date) {
    let stringDate = '' + fecha, iT = stringDate.indexOf('T'), iz = stringDate.indexOf('.'),
    time = stringDate.slice(iT + 1, iz), date = stringDate.slice(0, iT);  return date + ' ' + time
  }
}
