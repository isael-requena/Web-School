import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {HomeworkService} from '../../services/homework.service';

@Component({
  selector: 'app-new-homework',
  templateUrl: './new-homework.page.html',
  styleUrls: ['./new-homework.page.scss'],
})
export class NewHomeworkComponent implements OnInit {
  public showFirstStep: boolean = true;
  public showSecondStep: boolean = false;
  homeworkForm: FormGroup;

  constructor(
    public modalController: ModalController,
    private homeworkService: HomeworkService
  ) {
    this.homeworkForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      schoolSubject: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {

  }

  public handleNextStep() {
    try {
      console.log(this.homeworkForm?.get('title')?.value);
      console.log(this.homeworkForm?.get('description')?.value);
      if(this.homeworkForm?.get('title')?.value && this.homeworkForm?.get('description')?.value) {
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
    console.log(this.homeworkForm?.get('endDate')?.value)
  }

  submitHomework() {

  }

}
