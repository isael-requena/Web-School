import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { AuthService } from './services/auth.service';
register();

import { MenuOptInterface } from './interfaces/Menu'
import { MENU_OPT } from './providers/menu'
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appOptMenu: MenuOptInterface[] = MENU_OPT;

  constructor(
    private router: Router,
    public auth: AuthService
  ) {
  }

  navigate(url: string){
    this.router.navigate([url])
  }

}
