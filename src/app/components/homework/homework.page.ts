import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { HomeworkService } from '../../services/homework.service';
import { DateFormatService } from '../../services/date-format.service';


import { HomeworkInterface } from '../../interfaces/Homework'
import { UserInterface } from '../../interfaces/User'
import Swal from 'sweetalert2';

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
  @Input() userId!: number | undefined;
  @Input() isTeacher: boolean = false;

  constructor(
    private homeworkService: HomeworkService,
    private dateFormat: DateFormatService
  ) {
  }

  ngOnInit() { }

  onLabelClick($event: any) {
    $event.preventDefault();
    this.showModalEmit.emit(this.item)
  }
  onDeleteClick($event:any) {
    $event.preventDefault();
    Swal.fire({
      title: 'Desea eliminar la tarea?',
      showDenyButton: true,
      showConfirmButton: false,
      showCancelButton: true,
      denyButtonText: `Eliminar`,
    }).then((result) => {
      if (result.isDenied) {
        this.deleteEmit.emit(this.item)
        Swal.fire('Tarea eliminada', '', 'success')
      }
    })
  }

  public activeDoneEvent() {
    if (this.item) {
      this.item.status = this.item.status === "COMPLETED" ? "IN PROGRESS" : "COMPLETED";
      let startValue: any = '' + this.item.start_date
      let endValue: any = '' + this.item.end_date
      const homework: HomeworkInterface = {
        id: this.item.id,
        title: this.item.title,
        description: this.item.description,
        status: this.item.status,
        start_date: this.dateFormat.formatDateSql(startValue),
        end_date: this.dateFormat.formatDateSql(endValue),
        school_subject: this.item.school_subject
      }
      this.homeworkService.updateHomework(homework, this.userId).then((res: HomeworkInterface) => {
        // let element = document.getElementById(`item_${res.id}`)
        // element?.classList.add(res.homework_done ?  'fadeOutDown' : 'fadeOutUp')
        this.updateEmit.emit(res)
      })
    }
  }


}
