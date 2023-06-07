import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios'

import { HomeworkInterface } from '../interfaces/Homework';

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {

  private urlBase = 'https://api-web-school.up.railway.app/';

  constructor(
    public http: HttpClient,
  ) {
  }

  async getAllHomeworksShort(userId: number | undefined): Promise<HomeworkInterface[] | []> {
    try {
      const result = await axios.get<HomeworkInterface[]>(`${this.urlBase}api/homeworks/${userId}`)
      return result.data
    } catch (error) {
      return []
    }
  }

  getAllHomeworks(userId: number | undefined) {
    return new Promise<HomeworkInterface[]>(async (resolve: any, reject: any) => {
      try {
        this.http.get<HomeworkInterface[]>(`${this.urlBase}api/homeworks/${userId}`).subscribe((res: any) => {

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

  updateHomework(data: HomeworkInterface, userId: number | undefined) {
    return new Promise<HomeworkInterface>(async (resolve: any, reject: any) => {
      try {
        this.http.put<HomeworkInterface>(`${this.urlBase}api/homeworks/update/${userId}/${data.id}`, data).subscribe((res: HomeworkInterface) => {
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

  deleteHomework(oldTitle: string | undefined) {
    return new Promise<HomeworkInterface>(async (resolve: any, reject: any) => {
      try {
        this.http.delete(`${this.urlBase}api/homeworks/delete/${oldTitle}`, {
          observe: 'response',
          responseType: 'blob',
        }).subscribe((res: any) => {
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
