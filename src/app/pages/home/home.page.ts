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
  public homeworkSlide: HomeworkInterface[] = [];

  private homeworkSlideTimout!: any;
  public showSlideSpinner: boolean = false;

  constructor(
    private homeworkService: HomeworkService
  ) {
    try {
      this.getHomeworksList()
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

  addHomework(homework: HomeworkInterface) {
    // this.homeworkList.unshift(homework);
    this.getHomeworksList()
  }

  getHomeworksList() {
    try {
      this.homeworkService.getAllHomeworks().then((homeworks: HomeworkInterface[]) => {
        homeworks.sort((a,b) => a.homework_done - b.homework_done);
        console.log(homeworks);
        this.homeworkList = homeworks;
        this.homeworkSlide = this.homeworkList.sort((a, b) => new Date(b.homework_end_date).getTime() - new Date(a.homework_end_date).getTime() && a.homework_done - b.homework_done)
        .filter((homework: any) => homework.homework_done === 0)
      });
    } catch (error) {
      console.error(error)
    }
  }

  updateSlides() {
    if (this.homeworkSlideTimout) clearTimeout(this.homeworkSlideTimout)
    this.showSlideSpinner = true
    this.homeworkSlideTimout = setTimeout(() => {
      this.showSlideSpinner = false;
    }, 500);
  }

  filterSchoolSubject(homework: HomeworkInterface) {
    return this.schoolSubjects.find((schoolSubject:any) => schoolSubject.value === homework.school_subject).name
  }

}
