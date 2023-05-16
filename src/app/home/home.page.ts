/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component } from '@angular/core';

import {HomeworkInterface} from '../interfaces/Homework';

import {HomeworkService} from '../services/homework.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  schoolSubjects: any = [
    {
      value: 'ghc',
      name: 'G.H.C',
      valueProgress: 0.7
    },
    {
      value: 'ciencias_de_la_tierra',
      name: 'Ciencias de la Tierra',
      valueProgress: 0.2

    },
    {
      value: 'ingles',
      name: 'Inglés',
      valueProgress: 0.5
    },
    {
      value: 'fpsn',
      name: 'F.P.S.N',
      valueProgress: 0.8
    },
  ];

  public homeworkList: HomeworkInterface[];
  sliderConfig = {
    spaceBetween:  1,
    slidesPerView: 1.7
  };
  public showNewHomeworkComp: boolean = false;

  constructor(
    private homeworkService: HomeworkService
  ) {
    this.homeworkService.getAllHomeworks().then((homeworks: HomeworkInterface[]) => {
      console.log(homeworks);
      this.homeworkList = homeworks;
    });
  }

  handleHomeworkWindow() {
    this.showNewHomeworkComp = true;
  }

  closeHomeworkWindow(value: boolean) {
    this.showNewHomeworkComp = value;
  }

}
