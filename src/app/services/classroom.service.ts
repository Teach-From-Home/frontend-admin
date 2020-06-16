import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { REST_SERVER_URL } from './configurations';
import { Classroom } from '../domain/classroom';
import { User } from '../domain/user';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private httpCLient: HttpClient) { }

  async getClassrooms(): Promise<Classroom[]> {
    const users = await this.httpCLient.get<Classroom[]>(`${REST_SERVER_URL}/classrooms`).toPromise()
    return users.map((friend) => Classroom.fromJson(friend))
  }

  async getClassroomById(id: string): Promise<Classroom> {
    const user = await this.httpCLient.get<Classroom>(`${REST_SERVER_URL}/classroom/${id}`).toPromise()
    return Classroom.fromJson(user)
  }

  async updateClassroom(classroom: Classroom) {
    return await this.httpCLient.put(`${REST_SERVER_URL}/classroom/${classroom.id}`, { ...classroom }).toPromise()
  }

  async createClassroom(classroom: Classroom) {
    return await this.httpCLient.post(`${REST_SERVER_URL}/classroom`, { ...classroom }).toPromise()
  }

  async deleteClassroom(id: string) {
    return await this.httpCLient.delete(`${REST_SERVER_URL}/classroom/${id}`).toPromise()
  }

  async notAddedTeachers(id: string) {
    const users = await this.httpCLient.get<User[]>(`${REST_SERVER_URL}/classroom/${id}/teachers/notadded`).toPromise()
    return users.map((friend) => User.fromJson(friend))
  }

  async notAddedStudents(id: string) {
    const users = await this.httpCLient.get<User[]>(`${REST_SERVER_URL}/classroom/${id}/students/notadded`).toPromise()
    return users.map((friend) => User.fromJson(friend))
  }

  async addUser(cid: string, uid: string) {
    return await this.httpCLient.post(`${REST_SERVER_URL}/classroom/${cid}/user/${uid}`, {}).toPromise()
  }

  async deleteUser(cid: string, uid: string) {
    return await this.httpCLient.delete(`${REST_SERVER_URL}/classroom/${cid}/user/${uid}`).toPromise()
  }

}
