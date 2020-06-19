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
    const subjects = await this.httpCLient.get<Subject[]>(`${REST_SERVER_URL}/subjects`).toPromise()
    return subjects.map((subject) => Subject.fromJson(subject))
  }

  async getNotAddedSubjects(userId:string): Promise<Subject[]> {
    const subjects = await this.httpCLient.get<Subject[]>(`${REST_SERVER_URL}/user/${userId}/subjects/notadded`).toPromise()
    return subjects.map((subject) => Subject.fromJson(subject))
  }

  async deleteSubject(id: string){
    return await this.httpCLient.delete(`${REST_SERVER_URL}/subject/${id}`).toPromise()
  }

  async getSubjectById(id: string):Promise<Subject>{
    const subject = await this.httpCLient.get(`${REST_SERVER_URL}/subject/${id}`).toPromise()
    return Subject.fromJson(subject)
  }

  async updateSubject(subject: Subject){
    return await this.httpCLient.put(`${REST_SERVER_URL}/subject/${subject.id}`,{...subject}).toPromise()
  }

  async createSubject(subject: Subject){
    return await this.httpCLient.post(`${REST_SERVER_URL}/subject`,{...subject}).toPromise()
  }
  
}
