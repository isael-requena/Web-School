import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HomeworkService } from '../../services/homework.service';
import { DateFormatService } from '../../services/date-format.service';

import { HomeworkInterface } from '../../interfaces/Homework';

@Component({
  selector: 'app-new-homework',
  templateUrl: './new-homework.page.html',
  styleUrls: ['./new-homework.page.scss'],
})
export class NewHomeworkComponent implements OnInit, OnDestroy {
  @ViewChild('endDate') endDate: any;
  @Output() homeworkEmit = new EventEmitter<HomeworkInterface>()
  public showFirstStep: boolean = true;
  public showSecondStep: boolean = false;
  homeworkForm: FormGroup;
  public nextWeek: Date = new Date()
  public showSpinner: boolean = false;
  public btnSendCounter: number = 0;

  constructor(
    public modalController: ModalController,
    private homeworkService: HomeworkService,
    public dateFormat: DateFormatService
  ) {
    this.homeworkForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      status: new FormControl('IN PROGRESS'),
      schoolSubject: new FormControl('INGLÉS'),
    });
    const today = new Date()
    this.nextWeek.setDate(today.getDate() + 7)
  }

  ngOnInit() {
    try {
      // this.initDates();
    } catch (error) {
      console.error(error)
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    try {

      this.btnSendCounter = 0
    } catch (error) {
      console.error(error)
    }
  }

  /*   private initDates() {
      try {
        this.homeworkForm.get('startDate')?.setValue(this.formatDate(new Date()))
        this.homeworkForm.get('endDate')?.setValue(this.nextWeek);
      } catch (error) {
        console.error(error)
      }
    } */

  public handleNextStep(event: Event) {
    try {
      // event.preventDefault()
      console.log(this.homeworkForm?.get('title')?.valid)
      console.log(this.homeworkForm?.get('title')?.value)
      console.log(this.showFirstStep)
      console.log(this.showSecondStep)
      if (this.homeworkForm?.get('title')?.valid) {
        console.log('pase')
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
  }

  submitHomework() {
    try {
      this.showSpinner = true;
      this.btnSendCounter++;
      if (this.btnSendCounter === 1) {

        const homework: HomeworkInterface = {
          title: this.homeworkForm.get('title')?.value,
          description: this.homeworkForm.get('description')?.value,
          status: this.homeworkForm.get('done')?.value,
          start_date: this.dateFormat.formatDate(new Date()),
          // homework_end_date: this.homeworkForm.get('endDate')?.value,
          end_date: this.dateFormat.formatDate(this.endDate.value),
          school_subject: this.homeworkForm.get('schoolSubject')?.value
        }
        this.homeworkService.createHomework(homework).then((Res: HomeworkInterface) => {
          this.showSpinner = false;
          this.homeworkEmit.emit(Res);
          this.modalController.dismiss();
        })
      }

    } catch (error) {
      console.error(error)
    }
  }
}
