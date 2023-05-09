import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HomeworkInterface} from '../interfaces/Homework';

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {

  private urlBase = 'https://api-web-school.up.railway.app/';

  constructor(
    public http: HttpClient,
  ){
  }

  getAllHomeworks() {
      return new Promise(async (resolve: any, reject: any) => {
        try {
              this.http.get(`https://api-web-school.up.railway.app/api/homeworks`).subscribe((res: HomeworkInterface[]) => {

                if (res && res.length) {resolve(res);}
                else {reject('No se encuentran tareas');}
              }, error => {
                reject(error);
              });


        } catch (error) {
          reject(error);
        }
      });

  }

}
