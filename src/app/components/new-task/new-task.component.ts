/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {HomeworkService} from '../../services/homework.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  public showFirstStep: boolean = true;
  public showSecondStep: boolean = false;
  homeworkForm: FormGroup;

  constructor(
    public modalController: ModalController,
    private homeworkService: HomeworkService
  ) {}

  ngOnInit() {
    this.homeworkForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      schoolSubject: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
    });
  }

  public handleNextStep() {
    try {
      console.log(this.homeworkForm.get('title').value);
      console.log(this.homeworkForm.get('description').value);
      if(this.homeworkForm.get('title').value && this.homeworkForm.get('description').value) {
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
    console.log(this.homeworkForm.get('schoolSubject').value)
    console.log(this.homeworkForm.get('endDate').value)
  }

  submitHomework() {

  }

}
