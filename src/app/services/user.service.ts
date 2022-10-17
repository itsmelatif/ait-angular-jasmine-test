import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppConstant } from '../constant/app-constant';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endPoint = AppConstant.END_POINT;

  constructor(
    private http: HttpClient
  ) { }

  saveUser(userForm: UserModel): Observable<string>{
    return this.http.post<string>(this.endPoint+'users.json', userForm);
  }

  getUsers(): Observable<UserModel[]>{
    return this.http.get<{ [key: string]: UserModel}>(this.endPoint+'users.json')
    .pipe(
      map((resData: {[key: string]: UserModel}) => {
        console.log(resData);
        const newUser: UserModel[] = [];
        for(let key in resData){
          if(resData.hasOwnProperty(key)){
            newUser.push({...resData[key]});
          }
        }
        return newUser;
      })
    );
  }
}
