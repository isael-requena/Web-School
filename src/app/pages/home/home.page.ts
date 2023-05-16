import { Component, OnInit } from '@angular/core';

import { HomeworkInterface } from '../../interfaces/Homework';

import { HomeworkService } from '../../services/homework.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

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

  public homeworkList: HomeworkInterface[] = [];
  sliderConfig = {
    spaceBetween: 1,
    slidesPerView: 1.7
  };
  public showNewHomeworkComp: boolean = false;

  constructor(
    private homeworkService: HomeworkService
  ) {
    try {

      this.homeworkService.getAllHomeworks().then((homeworks: any) => {
        console.log(homeworks);
        this.homeworkList = homeworks;
      });
    } catch (error) {
      console.error(error)
    }
  }

  ngOnInit(): void {
    try {

    } catch (error) {
      console.error(error)
    }
  }

  handleHomeworkWindow() {
    this.showNewHomeworkComp = true;
  }

  closeHomeworkWindow(value: boolean) {
    this.showNewHomeworkComp = value;
  }

}
