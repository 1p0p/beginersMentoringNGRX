import { Injectable, inject } from '@angular/core';
import { IUser } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of, retry, tap } from 'rxjs';
import { JsonTransformService } from './json-transform.service';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';
  users: IUser[] = [];
  json = inject(JsonTransformService);
  constructor(
    private http: HttpClient
  ) {}

  getUsers(): Observable<IUser[]> {
    let usersJson:IUser[] = this.json.getUsersJSON();
    if(usersJson.length===0)
      return this.getUsersBack(); // подписываемся сразу в шаблоне через пайп
    
    //получение данных из localStore
    const observable$ : Observable<IUser[]> = of(usersJson).pipe(
      tap((users:IUser[])=>this.users = users)
    );
    // const subscription = observable.subscribe((x) => console.log(x));
    return observable$;
  }

  getUsersBack(): Observable<IUser[]> { 
    return this.http.get<IUser[]>(this.usersUrl,{}).pipe(
      tap((user : IUser[])=> {this.users = user}),
      retry(2),
    );
  }
  
  private getMaxIdUsers() : string {
    return this.users ?
      String(Math.max(...this.users.map((user:IUser)=>+user.id))+1)
      : '0';
  }

  // создается неправильный id у пользоваеля - постоянно 11, из-за этого удаляется пачка новых юзеров
  // - из-за добавления на сервис тк как в нем только 10 юзеров а мы не добавляем фактически туда
  create(user: IUser): Observable<IUser> { 
    return this.http.post<IUser>(this.usersUrl, user)
      .pipe(
        tap(user=>{
          // user.id=String(Math.floor(Math.random() * 1000));
          user.id = String(new Date().getTime());
          this.users = [...this.users, user]
        }),
        tap(()=> this.saveToLocalStore()) 
      );
  }

  delete(user: IUser): Observable<IUser> {
    this.users = this.users.filter((currentUser)=>currentUser.id!==user.id)
    this.saveToLocalStore();
    return of(user);
  }

  change(changeUser: IUser): Observable<IUser>{ 
    //обновить данные через HttpClient
    this.users= this.users.map((user)=>user.id!==changeUser.id ? user:changeUser);
    this.saveToLocalStore();
    return of(changeUser);
  }

  saveToLocalStore(){
    this.json.toJSON(this.users);
  }
}