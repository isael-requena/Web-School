import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class HelperClassService {
  secretKey = "YourSecretKeyForEncryption&Descryption";

  constructor(private http: HttpClient) { }

  encrypt(value: string) {
    try {

      if (value) {
        var _encrypt = CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
        return _encrypt
      } else {
        return value
      }

    } catch (error) {
      console.error(error)
      return value
    }
  }

  decrypt(textToDecrypt: string) {
    try {

      if (textToDecrypt) {
        var _descrypt = CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8)
        return _descrypt;
      } else {
        return textToDecrypt
      }

    } catch (error) {
      console.error(error)
      return textToDecrypt
    }
  }
}
