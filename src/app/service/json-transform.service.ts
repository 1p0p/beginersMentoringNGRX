import { Injectable } from '@angular/core';
import { IUser } from '../model/user.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class JsonTransformService {
  
  constructor(private localStore: LocalStorageService) {}

  toJSON(users: IUser[]){
    let stringifyJSON = JSON.stringify(users);
    // console.log("json: ", users);
    this.localStore.setItem(stringifyJSON);
  }

  getUsersJSON():IUser[]{
    let users:string | null = this.localStore.getItem();
    let parsedJSON:IUser[] = [];
    if(users !== null){
      parsedJSON = JSON.parse(users!, (key:string, value:IUser)=>value);
      // console.log("paresedJSON: ", parsedJSON);
    }
    return parsedJSON;
  }
}
