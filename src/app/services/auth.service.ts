import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { HelperClassService } from './helper-class.service';

export type userType = {
  id: number;
  firstNames: string;
  lastNames: string;
  email: string;
  password: string;
  year: string;
  section: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _localStorageService: LocalStorageService,
    private router: Router,
    private helper: HelperClassService
  ) { }

  dummyLogin(data: {email:string, password:string}): userType | null {
    if (data.email == "alumno@gmail.com" && data.password == "123456") {
      const user: userType = {
        id: 1,
        firstNames: "ISAEL JAFETH",
        lastNames: "REQUENA ROMERO",
        email: data.email.toUpperCase(),
        password: this.helper.encrypt(data.password),
        year: "5to",
        section: "U",
      }
      console.log(user)
      this._localStorageService.set<userType>("user", user)
      return user
    }
    else return null;
  }

  public getAuth(): userType | null {
    try {
      return this._localStorageService.get<userType>('user');
    } catch (err) {
      return null
    }
  }

  logout(): void {
    try {
      this._localStorageService.remove('user');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error(error)
    }
  }
}
