import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LettersService {
  /*
  ==============================================
    Servicio para modificar textos al rededor de la app
  ==============================================
  */
  constructor() { }

  public toUpperAndLowerCase(text: string):string {//devuelve la primera letra upperCase y las demas lower
    return text?.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) => letter.toUpperCase());
  }

  public shortNamesFunc(name: string) {//para retornar los dos primeros nombres
    let shortNames: string, spaceIndex: number = name?.indexOf(' '); spaceIndex = name?.indexOf(' ', spaceIndex + 1); shortNames = name?.slice(0, spaceIndex > 0 ? spaceIndex : undefined);
    return shortNames;
  }
}
