import { Injectable } from '@angular/core';
import { Subject } from '../domain/subject';
import { HttpClient } from '@angular/common/http';
import { REST_SERVER_URL } from './configurations';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private httpCLient: HttpClient) { }

  async getAllSubjects(): Promise<Subject[]> {
    const users = await this.httpCLient.get<Subject[]>(`${REST_SERVER_URL}/subjects`).toPromise()
    return users.map((friend) => Subject.fromJson(friend))
  }

  async getNotAddedSubjects(userId:string): Promise<Subject[]> {
    const users = await this.httpCLient.get<Subject[]>(`${REST_SERVER_URL}/user/${userId}/subjects/notadded`).toPromise()
    return users.map((friend) => Subject.fromJson(friend))
  }

  

}
