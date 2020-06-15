import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { REST_SERVER_URL } from './configurations';
import { Classroom } from '../domain/classroom';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private httpCLient: HttpClient) { }

  async getClassrooms():Promise<Classroom[]>{
    const users = await this.httpCLient.get<Classroom[]>(`${REST_SERVER_URL}/classrooms`).toPromise()
    return users.map((friend) => Classroom.fromJson(friend))
  }

  async getClassroomById(id: string):Promise<Classroom>{
    const user = await this.httpCLient.get<Classroom>(`${REST_SERVER_URL}/classroom/${id}`).toPromise()
    return Classroom.fromJson(user)
  }

  async updateClassroom(classroom: Classroom){
    return await this.httpCLient.put(`${REST_SERVER_URL}/classroom/${classroom.id}`,{...classroom}).toPromise()
  }

  async createClassroom(classroom: Classroom){
    return await this.httpCLient.post(`${REST_SERVER_URL}/classroom`,{...classroom}).toPromise()
  }
  
  async deleteClassroom(id: string){
    return await this.httpCLient.delete(`${REST_SERVER_URL}/classroom/${id}`).toPromise()
  }

}
