import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { REST_SERVER_URL } from './configurations';
import { User } from '../domain/user';
import { isString } from 'util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpCLient: HttpClient) { }

  async getUsers():Promise<User[]>{
    const users = await this.httpCLient.get<User[]>(`${REST_SERVER_URL}/users`).toPromise()
    return users.map((friend) => User.fromJson(friend))
  }

  async getUserById(id: string):Promise<User>{
    const user = await this.httpCLient.get<User>(`${REST_SERVER_URL}/user/${id}`).toPromise()
    return User.fromJson(user)
  }

  async updateUser(user: User){
    return await this.httpCLient.put(`${REST_SERVER_URL}/user/${user.id}`,{...user}).toPromise()
  }

  async createUser(user: User){
    return await this.httpCLient.post(`${REST_SERVER_URL}/user`,{...user}).toPromise()
  }
  
  async deleteUser(id: string){
    return await this.httpCLient.delete(`${REST_SERVER_URL}/user/${id}`).toPromise()
  }
}