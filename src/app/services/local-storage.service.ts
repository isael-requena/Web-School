import { Injectable } from '@angular/core';
import { HelperClassService } from './helper-class.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  /* Almacena de manera local pequeñas informaciones que pueden ejecutarse dentro de la aplicacion
     En cierto modo, bastante similar al que trae nativo Javascript */
     constructor(
      private helper: HelperClassService
    ) { }

    public set<type>(item: string, data: type): boolean {
      try{
      localStorage.setItem(item, this.helper.encrypt(JSON.stringify(data)));
      return true
      }catch(e){
        return false
      }
    }

    public get<type>(item: string): type | null {
      try{
        return JSON.parse(this.helper.decrypt(localStorage.getItem(item) || ''));
      }catch(err){
        return null;
      }
    }

    public remove(item: string) {
      this.get<{isAuth: boolean}>('isAuth')
      localStorage.removeItem(item);
    }

    public removeAll() {
      localStorage.clear();
    }
}
