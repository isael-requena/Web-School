import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {
  public weeksArray: Array<string> = ["Dom.","lun.","Mart.","Miérc.","Juev.","Vier.","Sáb"];
  public monthsArray: Array<string> = ["dic.","en.","febr.","mzo","abr","my","jun.","jul.","ag.","sept.","oct.","nov.","dic."]
  constructor() { }

  formatDate(date: Date) {
    const d = new Date(date);
    let month = this.startWithCero('' + (d.getMonth() + 1));
    let day = this.startWithCero('' + d.getDate());
    const year = d.getFullYear();
    let hour = this.startWithCero('' + d.getHours()), minutes = this.startWithCero('' + d.getMinutes()), seconds = this.startWithCero('' + d.getSeconds());
    const dateArray = [year, month, day].join('-');
    const timeArray = [hour, minutes, seconds].join(':')
    const dateFormat = dateArray + " " + timeArray; return dateFormat;
  }
  startWithCero(time: string) {
    if (time.length < 2) return time = '0' + time;
    else return time
  }

  formatDateSql(fecha: Date) {
    let stringDate = '' + fecha, iT = stringDate.indexOf('T'), iz = stringDate.indexOf('.'),
    time = stringDate.slice(iT + 1, iz), date = stringDate.slice(0, iT);  return date + ' ' + time
  }


  formatShortDate(dateString:any) {
    const date = new Date(dateString)
    let day = '' + this.weeksArray[date.getDay()+1]+" "+date.getDate()+" "+ this.monthsArray[date.getMonth()+1]
    return day;
  }

}
