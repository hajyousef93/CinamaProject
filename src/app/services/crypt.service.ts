import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'; 


@Injectable({
  providedIn: 'root'
})
export class CryptService {

  constructor() { }

  iv=CryptoJS.enc.Utf8.parse('7061737323313233');
  secretkey='123456$#@$^@1ERF';


  Encryption(value:string):string
  {
      const key=CryptoJS.enc.Utf8.parse(this.secretkey)
      const iv=CryptoJS.enc.Utf8.parse(this.secretkey)
      const encrypted=CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()),key,{
        keySize:128/8,
        iv,
        mode:CryptoJS.mode.CBC,
        padding:CryptoJS.pad.Pkcs7
      });
     

    return encrypted.toString();
  }
 Decryption(value:string):string
  {
      const key=CryptoJS.enc.Utf8.parse(this.secretkey)
      const iv=CryptoJS.enc.Utf8.parse(this.secretkey)
      const decrypted=CryptoJS.AES.decrypt(value,key,{
        keySize:128/8,
        iv,
        mode:CryptoJS.mode.CBC,
        padding:CryptoJS.pad.Pkcs7
      });

    return decrypted.toString(CryptoJS.enc.Utf8)
  }
}
