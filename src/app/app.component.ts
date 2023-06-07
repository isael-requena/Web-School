import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { AuthService } from './services/auth.service';
register();

import { MenuOptInterface } from './interfaces/Menu'
import { MENU_OPT } from './providers/menu'
import { Router } from '@angular/router';
import { UserInterface } from './interfaces/User';
import { LettersService } from './services/letters.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appOptMenu: MenuOptInterface[] = MENU_OPT;
  user: UserInterface | null;
  public isTeacher: boolean = false;

  constructor(
    private router: Router,
    public auth: AuthService,
    public letterService: LettersService,
  ) {
    this.user = auth.getAuth()
    this.isTeacher = this.user?.role === 2 ? true : false;
    console.log(this.user?.role)
    console.log(this.isTeacher)
  }

  navigate(url: string){
    this.router.navigate([url])
  }

}
