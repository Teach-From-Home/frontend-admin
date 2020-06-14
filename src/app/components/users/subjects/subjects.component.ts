import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from 'src/app/domain/user';
import { Subject } from 'src/app/domain/subject';
import { SubjectsService } from 'src/app/services/subjects.service';
import { isUndefined, isString } from 'util';
import * as _ from 'lodash'
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  @Input() title: String
  @Input() user: User
  subjectsNotAdded: Subject[]
  myControl = new FormControl(); 

  constructor(private subjectService:SubjectsService,private snackBar: MatSnackBar) { }

  async ngOnInit() {
    isUndefined(this.user.id) ?
    this.subjectsNotAdded = await this.subjectService.getAllSubjects():
    this.subjectsNotAdded = await this.subjectService.getNotAddedSubjects(this.user.id)
  }

  displayFn(individual?: Subject): string | undefined {
    return individual ? individual.name : undefined;
  }

  cantAddSubject() {
    return this.myControl.value == null 
  }

  deleteSubject(deletedSubject: Subject) {
    _.remove(this.user.subjects, deletedSubject)
    this.subjectsNotAdded.push(deletedSubject)
  }

  addSubject() {
    if(isString(this.myControl.value)){
      this.error('Seleccione una materia de la lista')
      this.myControl.setValue(null)
      return
    }
    this.user.subjects.push(this.myControl.value)
    _.remove(this.subjectsNotAdded, this.myControl.value)
    this.myControl.setValue(null)
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
