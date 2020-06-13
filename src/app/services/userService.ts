import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { REST_SERVER_URL } from './configurations';
import { User } from '../domain/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpCLient: HttpClient) { }

  async getUsers():Promise<User[]>{
    const users = await this.httpCLient.get<User[]>(`http://186.137.65.8:16000/users`).toPromise()
    return users.map((friend) => User.fromJson(friend))
  }

  async getUserById(id: string):Promise<User>{
    const user = await this.httpCLient.get<User>(`http://186.137.65.8:16000/user/${id}`).toPromise()
    return User.fromJson(user)
  }

  async updateUser(user: User){
    return this.httpCLient.put<User>(`http://186.137.65.8:16000/user`,{user}).toPromise()
  }
}