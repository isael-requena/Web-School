import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HomeworkService } from '../../services/homework.service';

import { HomeworkInterface } from '../../interfaces/Homework';

@Component({
  selector: 'app-new-homework',
  templateUrl: './new-homework.page.html',
  styleUrls: ['./new-homework.page.scss'],
})
export class NewHomeworkComponent implements OnInit {
  @ViewChild('endDate') endDate: any;
  @Output() homeworkEmit = new EventEmitter<HomeworkInterface>()
  public showFirstStep: boolean = true;
  public showSecondStep: boolean = false;
  homeworkForm: FormGroup;
  public nextWeek: Date = new Date()

  constructor(
    public modalController: ModalController,
    private homeworkService: HomeworkService
  ) {
    this.homeworkForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      done: new FormControl(0),
      schoolSubject: new FormControl('ingles'),
    });
    const today = new Date()
    this.nextWeek.setDate(today.getDate() + 7)
    console.log(this.nextWeek)
  }

  ngOnInit() {
    try {
      // this.initDates();
    } catch (error) {
      console.error(error)
    }
  }

/*   private initDates() {
    try {
      this.homeworkForm.get('startDate')?.setValue(this.formatDate(new Date()))
      this.homeworkForm.get('endDate')?.setValue(this.nextWeek);
      console.log(this.homeworkForm.get('endDate')?.value)
    } catch (error) {
      console.error(error)
    }
  } */

  public handleNextStep() {
    try {
      console.log(this.homeworkForm?.get('title')?.value);
      console.log(this.homeworkForm?.get('description')?.value);
      if (this.homeworkForm?.get('title')?.valid) {
        this.showFirstStep = false;
        this.showSecondStep = true;
      }
    } catch (error) {
      console.error(error);
    }
  }

  public handleBackStep() {
    this.showSecondStep = false;
    this.showFirstStep = true;
    console.log(this.homeworkForm?.get('schoolSubject')?.value)
    console.log(this.endDate.value)
  }

  submitHomework() {
    try {
      console.log(this.homeworkForm)
      const homework: HomeworkInterface = {
        homework_title: this.homeworkForm.get('title')?.value,
        homework_description: this.homeworkForm.get('description')?.value,
        homework_done: this.homeworkForm.get('done')?.value,
        homework_start_date: this.formatDate(new Date()),
        // homework_end_date: this.homeworkForm.get('endDate')?.value,
        homework_end_date: this.formatDate(this.endDate.value),
        school_subject: this.homeworkForm.get('schoolSubject')?.value
      }
      console.log(homework)
      this.homeworkService.createHomework(homework).then((Res: HomeworkInterface) => {
        this.homeworkEmit.emit(Res);
        this.modalController.dismiss();
      })
    } catch (error) {
      console.error(error)
    }
  }

  formatDate(date: Date) {
    const d = new Date(date);
    let month = this.startWithCero('' + (d.getMonth() + 1));
    let day = this.startWithCero('' + d.getDate());
    const year = d.getFullYear();
    let hour = this.startWithCero('' + d.getHours()), minutes = this.startWithCero('' + d.getMinutes()), seconds = this.startWithCero('' + d.getSeconds());
    const dateArray = [year, month, day].join('-');
    const timeArray = [hour, minutes, seconds].join(':')
    const dateFormat = dateArray + " " + timeArray; return dateFormat;
  }
  startWithCero(time: string) {
    if (time.length < 2) return time = '0' + time;
    else return time
  }
}
