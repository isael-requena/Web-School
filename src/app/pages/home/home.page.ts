import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { HomeworkInterface } from '../../interfaces/Homework';
import { UserInterface } from '../../interfaces/User'

import { HomeworkService } from '../../services/homework.service';
import { AuthService } from '../../services/auth.service';
import { LettersService } from '../../services/letters.service';
import { DateFormatService } from '../../services/date-format.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('homeworkSwiper') homeworkSwiper:any;

 /*  schoolSubjects: any = [
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
  ]; */

  public homeworkList: HomeworkInterface[] = [];
  sliderConfig = {
    spaceBetween: 1,
    slidesPerView: 1.7
  };
  public showDetails: boolean = false;
  public homeworkSlide: HomeworkInterface[] = [];

  private homeworkSlideTimout!: any;
  public showSlideSpinner: boolean = false;
  public homeworksSwipMessage: string = 'No se encontraron más tareas para esta semana';
  public showMsgeSwiper: boolean = false;

  public user:UserInterface;
  public isTeacher: boolean = false;
  public showCreateHomework: boolean = false;
  public selectedHomework: HomeworkInterface | undefined;

  constructor(
    private homeworkService: HomeworkService,
    public auth: AuthService,
    public letterService: LettersService,
    public dateFormatService: DateFormatService
  ) {
    try {
      this.user = auth.getAuth()
      this.isTeacher = this.user.role === 2 ? true : false;
      console.log(this.user)
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

  handleShowDetails(showValue:boolean, homework?:HomeworkInterface) {
    this.showDetails = showValue;
    this.selectedHomework = homework;
  }

  addHomework(homework: HomeworkInterface) {
    this.homeworkList.push(homework);
    this.getHomeworksList()
    this.showCreateHomework = false;
  }

  async getHomeworksList() {
    try {
      this.showSlideSpinner = true
/*       this.homeworkService.getAllHomeworks(this.user.id).then((homeworks: HomeworkInterface[]) => {
        // homeworks.sort((a, b) => a.homework_done - b.homework_done || new Date(b.homework_start_date).getTime() - new Date(a.homework_start_date).getTime());
        this.homeworkList = homeworks;
        console.log(this.homeworkList)
        this.homeworkSlide = this.filterByThisWeek(this.homeworkList)
        this.showSlideSpinner = false;
        // this.updateSlides()
      }); */
      this.homeworkList = await this.homeworkService.getAllHomeworksShort(this.user.id)
      this.homeworkSlide = this.filterByThisWeek(this.homeworkList)
      this.showSlideSpinner = false;
      if (!this.homeworkList) this.showSlideSpinner = false
    } catch (error) {
      console.error(error)
      // this.homeworksSwipMessage = `No se encontraron más tareas para esta semana`;
      // this.showMsgeSwiper = true;
      this.showSlideSpinner  = false;
    }
  }

  deleteHomework(homework: HomeworkInterface | undefined) {
    let element = document.getElementById(`item_${homework?.id}`)
    element?.classList.add('fadeOut');
    this.homeworkService.deleteHomework(homework?.title).then((res:any) => this.getHomeworksList())
  }

  updateSlides() {
    if (this.homeworkSlideTimout) clearTimeout(this.homeworkSlideTimout)
    this.showSlideSpinner = true
    this.homeworkSlideTimout = setTimeout(() => {
      this.showSlideSpinner = false;
    }, 150);
  }

/*   filterSchoolSubject(homework: HomeworkInterface) {
    return this.schoolSubjects.find((schoolSubject: any) => schoolSubject.value === homework.school_subject).name
  } */

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
        new Date(homework.end_date) >= today && new Date(homework.end_date) <= nextWeek && homework.status === "IN PROGRESS"
      )
      if (filtered && filtered.length ) this.showMsgeSwiper = false;
      else {
        this.showMsgeSwiper = true;
        homeworks.every((homework:HomeworkInterface) => homework.status === "COMPLETED")
        ? this.homeworksSwipMessage = `¡Felicidades, estás al día!`
        : this.homeworksSwipMessage = `No se encontraron más tareas para esta semana`;
      }
      return filtered

    } catch (error) {
      console.error(error)
      return []
    }
  }

  trackByItems(index:number, item:HomeworkInterface):number {
    return item.id;
  }

  async handleRefresh(event) {
    this.showDetails = false;
    await this.getHomeworksList()
    event.target.complete();
  }

}
