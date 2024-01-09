import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private token: string = 'usersToken';

  //localStorage.getItem('usersToken');
  //
  getItem(): string | null {
    /* если сделать так без ошибки "ERROR ReferenceError: localStorage is not defined"
    то не сохраняются данные в localStorage
    let item = null;
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(this.token)
    }
    return item;*/
    return localStorage.getItem(this.token) || null;
  }

  setItem(data: string): string {
    localStorage.setItem(this.token, data);
    return data;
  }

  //localStorage.removeItem('usersToken');
  removeItem(): boolean {
    localStorage.removeItem(this.token);
    return true;
  }
}
