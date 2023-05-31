import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { HomeworkInterface } from '../../interfaces/Homework';

import { HomeworkService } from '../../services/homework.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('homeworkSwiper') homeworkSwiper:any;

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
  public showDetails: boolean = false;
  public homeworkSlide: HomeworkInterface[] = [];

  private homeworkSlideTimout!: any;
  public showSlideSpinner: boolean = false;
  public homeworksSwipMessage: string = '';
  public showMsgeSwiper: boolean = false;

  public weeksArray: any = ["Dom.","lun.","Mart.","Miérc.","Juev.","Vier.","Sáb"];
  public monthsArray:any = ["dic.","en.","febr.","mzo","abr","my","jun.","jul.","ag.","sept.","oct.","nov.","dic."]

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

  ngAfterViewInit(): void {
    try {

    } catch (error) {
      console.error(error);
    }
  }

  handleHomeworkWindow(showValue:boolean, homework?:HomeworkInterface) {
    this.showDetails = showValue;
  }

  addHomework(homework: HomeworkInterface) {
    this.homeworkList.push(homework);
    this.getHomeworksList()
  }

  getHomeworksList() {
    try {
      // this.showSlideSpinner = true
      this.homeworkService.getAllHomeworks().then((homeworks: HomeworkInterface[]) => {
        // homeworks.sort((a, b) => a.homework_done - b.homework_done || new Date(b.homework_start_date).getTime() - new Date(a.homework_start_date).getTime());
        this.homeworkList = homeworks;
        this.homeworkSlide = this.filterByThisWeek(this.homeworkList)
        // this.showSlideSpinner = false;
        // this.updateSlides()
      });
    } catch (error) {
      console.error(error)
    }
  }

  deleteHomework(homework: HomeworkInterface | undefined) {
    let element = document.getElementById(`item_${homework?.homework_id}`)
    element?.classList.add('fadeOut');
    this.homeworkService.deleteHomework(homework?.homework_id).then((res:any) => this.getHomeworksList())
  }

  updateSlides() {
    if (this.homeworkSlideTimout) clearTimeout(this.homeworkSlideTimout)
    this.showSlideSpinner = true
    this.homeworkSlideTimout = setTimeout(() => {
      this.showSlideSpinner = false;
    }, 150);
  }

  filterSchoolSubject(homework: HomeworkInterface) {
    return this.schoolSubjects.find((schoolSubject: any) => schoolSubject.value === homework.school_subject).name
  }

  filterByThisWeek(homeworks: HomeworkInterface[]) {
    try {
      if (!homeworks || !homeworks.length) {
        return [];
      }
      const today = new Date()
      const nextWeek = new Date(today)
      nextWeek.setDate(nextWeek.getDate() + 7)

      const filtered = homeworks.filter(
        (homework:HomeworkInterface) =>
        new Date(homework.homework_end_date) >= today && new Date(homework.homework_end_date) <= nextWeek && homework.homework_done === 0
      )
      if (filtered && filtered.length ) this.showMsgeSwiper = false;
      else {
        this.showMsgeSwiper = true;
        homeworks.every((homework:HomeworkInterface) => homework.homework_done === 1)
        ? this.homeworksSwipMessage = `¡Felicidades, estás al día!`
        : this.homeworksSwipMessage = `No se encontraron más tareas para esta semana`;
      }
      return filtered

    } catch (error) {
      console.error(error)
      return []
    }
  }

  formatShortDate(dateString:any) {
    const date = new Date(dateString)
    let day = '' + this.weeksArray[date.getDay()+1]+" "+date.getDate()+" "+ this.monthsArray[date.getMonth()+1]
    return day;
  }

  trackByItems(index:number, item:HomeworkInterface):number {
    return item.homework_id;
  }
}
