import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/domain/user';
import { Subject } from 'src/app/domain/subject';
import { SubjectsService } from 'src/app/services/subjects.service';
import { isUndefined, isString, isObject } from 'util';
import * as _ from 'lodash'
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  @Input() user: User
  subjectsNotAdded: Subject[]
  myControl = new FormControl(); 
  textb:String = "";

  constructor(private subjectService:SubjectsService,private snackBar: MatSnackBar) { }

  async ngOnInit() {
    isUndefined(this.user.id) ?
    this.subjectsNotAdded = await this.subjectService.getAllSubjects():
    this.subjectsNotAdded = await this.subjectService.getNotAddedSubjects(this.user.id)
  }

  getSubjectsNotAdded(){
    if(isObject(this.textb)){
      return 
    }
    const filt =  this.subjectsNotAdded.filter( 
      (sub) => sub.name.toLowerCase().includes(this.textb.trim().toLowerCase())) 
    return filt;
  }

  displayFn(individual?: Subject): string | undefined {
    return individual ? individual.name : undefined;
  }

  cantAddSubject() {
    return this.myControl.value == null || this.myControl.value == "" 
  }

  deleteSubject(deletedSubject: Subject) {
    _.remove(this.user.subjects, deletedSubject)
    this.subjectsNotAdded.push(deletedSubject)
  }

  addSubject() {
    if(isString(this.myControl.value)){
      this.error('Seleccione una materia de la lista')
      this.myControl.setValue("")
      return
    }
    this.user.subjects.push(this.myControl.value)
    _.remove(this.subjectsNotAdded, this.myControl.value)
    this.myControl.setValue("")
  }

  error(errorType: string) {
    this.snackBar.open(errorType, 'x', {
      duration: 2000,
    });
  }

  hasSubjectsToAdd(){
    return this.subjectsNotAdded.length > 0 
  }
}
