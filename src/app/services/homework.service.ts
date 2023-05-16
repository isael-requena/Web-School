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
      return new Promise<HomeworkInterface[]>(async (resolve: any, reject: any) => {
        try {
              this.http.get<HomeworkInterface[]>(`${this.urlBase}api/homeworks`).subscribe((res: any) => {

                if (res && res.length) resolve(res);
                else reject('No se encuentran tareas');
              }, error => {
                reject(error);
              });


        } catch (error) {
          reject(error);
        }
      });

  }

  createHomework(data: HomeworkInterface) {
    return new Promise<HomeworkInterface>(async (resolve: any, reject: any) => {
      try {
            this.http.post<HomeworkInterface>(`${this.urlBase}api/homeworks/add`, data).subscribe((res: HomeworkInterface) => {

              if (res) resolve(res);
              else reject('Ocurrió un problema');
            }, error => {
              reject(error);
            });

      } catch (error) {
        reject(error);
      }
    });

}

}
