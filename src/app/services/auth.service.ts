import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HelperClassService } from './helper-class.service';
import { UserInterface } from '../interfaces/User'
export interface messageInterface {
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlBase = 'https://api-web-school.up.railway.app/';

  constructor(
    private _localStorageService: LocalStorageService,
    private router: Router,
    public http: HttpClient,

  ) { }

  public getAuth(): UserInterface | null {
    try {
      return this._localStorageService.get<UserInterface | null>('user');
    } catch (err) {
      return null
    }
  }

  public signUp(data: UserInterface) {
    return new Promise<UserInterface>(async (resolve: any, reject: any) => {
      try {
        this.http.post(`${this.urlBase}api/auth/signup`, data,  {
          observe: 'response',
          responseType: 'blob',
        }).subscribe((res: any) => {
          if (res) {
            this.login({email: data.email, password: data.password}).then((Res:any) => {
              Res ? resolve(Res) : reject('something is wrong');
            })
          }
          else reject('something is wrong');
        }, error => {
          reject(error);
        });

      } catch (error) {
        reject(error);
      }
    });
  }

  login (data: {email:string, password:string}): Promise<UserInterface> {
    return new Promise<UserInterface>(async (resolve: any, reject: any) => {
      try {
        this.http.post(`${this.urlBase}api/auth/signin`, data).subscribe((res: any) => {
          resolve(res)
          if (!res.message) {
            this._localStorageService.set<any>('user', res)
          }
        }, error => {
          reject(error);
        });

      } catch (error) {
        reject(error);
      }
    });
  };

  logout(): void {
    try {
      this._localStorageService.remove('user');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error(error)
    }
  }
}
