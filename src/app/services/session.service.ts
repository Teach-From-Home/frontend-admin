import { Injectable } from '@angular/core';
import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { User } from '../domain/user';
import { REST_SERVER_URL } from './configurations';
import { UserService } from './user.service';
import { isUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient, private userService:UserService,) {
  }

  async authenticate(credentials: User) {
    localStorage.clear()
    const userLogged = await this.http.post<User>(REST_SERVER_URL + '/login', credentials).toPromise()
    localStorage.setItem("session",JSON.stringify(userLogged))
  }


  getCookie():string{
    const user = JSON.parse(localStorage.getItem("session"))
    return (user)
  }

  isAuthenticated():boolean{
    return !isUndefined(this.getCookie)
  }

  logout(){
    localStorage.clear()
  }

}
