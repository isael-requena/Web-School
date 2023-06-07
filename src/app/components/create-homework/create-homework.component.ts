import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { HomeworkInterface } from '../../interfaces/Homework';
import { DateFormatService } from '../../services/date-format.service';
import { HomeworkService } from '../../services/homework.service';

@Component({
  selector: 'app-create-homework',
  templateUrl: './create-homework.component.html',
  styleUrls: ['./create-homework.component.scss']
})
export class CreateHomeworkComponent implements OnInit, OnDestroy {

  @ViewChild('endDate') endDate: any;
  @Output() homeworkEmit = new EventEmitter<HomeworkInterface>()
  @Output() closeModalEmit = new EventEmitter<boolean>()
  @Input() userId!: number | undefined;
  homeworkForm: FormGroup;
  public nextWeek: Date = new Date()
  public showSpinner: boolean = false;
  public btnSendCounter: number = 0;
  public formStepCout: number = 1;
  public isSmallHeight: boolean = (window.screen.availHeight <= 620);

  constructor(
    public modalController: ModalController,
    private homeworkService: HomeworkService,
    public dateFormat: DateFormatService,
    private fb: FormBuilder,
  ) {
    this.homeworkForm = this.fb.group({
      // 'user_id': [this.userId],
      'title': ['', Validators.required],
      'description': [null],
      'status': ['IN PROGRESS'],
      'schoolSubject': ['INGLÉS'],
    });
    const today = new Date()
    this.nextWeek.setDate(today.getDate() + 7)
  }

  ngOnInit() {
    try {
      // setInterval(() => {
      //   console.log(this.homeworkForm.get('title')?.valid)
      // }, 4000)
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

  public handleStep(event?: Event): void {
    // event?.preventDefault();
    if (this.formStepCout === 1 && this.homeworkForm.get('title')?.valid) {
      console.log('Pase a formStepCount === 1')
      this.formStepCout++;
    } else if (this.formStepCout === 2) {
      console.log('Pase a formStepCount === 2')
      this.formStepCout--;
      this.btnSendCounter = 0;
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

  submitHomework(event?: Event) {
    try {
      event?.preventDefault()
      this.showSpinner = true;
      this.btnSendCounter++;
      if (this.btnSendCounter === 1) {

        const homework: HomeworkInterface = {
          // user_id: this.homeworkForm.get('user_id')?.value,
          title: this.homeworkForm.get('title')?.value,
          description: this.homeworkForm.get('description')?.value,
          status: this.homeworkForm.get('status')?.value,
          start_date: this.dateFormat.formatDate(new Date()),
          // homework_end_date: this.homeworkForm.get('endDate')?.value,
          end_date: this.dateFormat.formatDate(this.endDate.value),
          school_subject: this.homeworkForm.get('schoolSubject')?.value
        }
        console.log(homework)
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

  closeModal() {
    this.closeModalEmit.emit(true);
    this.formStepCout = 1
  }
}
