import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'src/app/domain/subject';
import { SubjectsService } from 'src/app/services/subjects.service';
import { isUndefined, isString } from 'util';
import * as _ from 'lodash'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Classroom } from 'src/app/domain/classroom';

@Component({
  selector: 'app-singleSubjectSelector',
  templateUrl: './singleSubjectSelector.component.html',
  styleUrls: ['./singleSubjectSelector.component.css']
})
export class SingleSubjectSelectorComponent implements OnInit {

  
  @Input() classroom: Classroom 
  subjectsNotAdded: Subject[] 
  myControl = new FormControl(); 

  constructor(private subjectService:SubjectsService,private snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.subjectsNotAdded = await this.subjectService.getAllSubjects()

    if(isUndefined(this.classroom))
      this.classroom = new Classroom()

    if(!isUndefined(this.classroom.subject))
      _.remove(this.subjectsNotAdded, this.classroom.subject)
    
  }

  displayFn(individual?: Subject): string | undefined {
    return individual ? individual.name : undefined;
  }

  cantAddSubject() {
    return this.myControl.value == null 
  }

  addSubject() {
    if(isString(this.myControl.value)){
      this.error('Seleccione una materia de la lista')
      this.myControl.setValue(null)
      return
    }
    if(!isUndefined(this.classroom.subject))
     this.subjectsNotAdded.push(this.classroom.subject)
    this.classroom.subject = this.myControl.value
    _.remove(this.subjectsNotAdded, this.myControl.value)
    this.myControl.setValue(null)
  }

  error(errorType: string) {
    this.snackBar.open(errorType, 'x', {
      duration: 2000,
    });
  }

}
