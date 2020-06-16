import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/domain/user';
import { UserService } from 'src/app/services/user.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { Classroom } from 'src/app/domain/classroom';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditListOfUsersComponent } from '../editListOfUsers/editListOfUsers.component';
import { EditUsersComponent } from './editUsers/editUsers.component';

@Component({
  selector: 'app-classroomUsers',
  templateUrl: './classroomUsers.component.html',
  styleUrls: ['./classroomUsers.component.css']
})
export class ClassroomUsersComponent implements OnInit {

  classroom: Classroom
  constructor(public dialog: MatDialog, private userService: UserService, private classroomService: ClassroomService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fetchUsers(false)
  }

  async fetchUsers(showSnack: boolean) {
    this.classroom = null
    try {
      this.classroom = await this.classroomService.getClassroomById("9")
    }
    catch (e) {
      this.error(e)
    }
    if (showSnack)
      this.error("Modificacion realizada con exito!!")
    console.log(this.getTeachers())
  }

  deleteUser(event: string) {
    this.classroomService.deleteUser(this.classroom.id, event)
      .then( () => this.fetchUsers(true) )
    
  }

  getStudents() {
    const students = this.classroom.users.filter((user) => { return (user.role == "STUDENT") })
    return students;
  }

  editUsers(types: string) {
    const dialogRef = this.dialog.open(EditUsersComponent, {
      data: { id: this.classroom.id, type: types }
    })
    dialogRef.afterClosed().subscribe(() => {
      this.fetchUsers(false)
    })
  }

  getTeachers() {
    const teachers = this.classroom.users.filter((user) => { return (user.role == "TEACHER") })
    return teachers;
  }

  error(errorType: string) {
    this.snackBar.open(errorType, 'x', {
      duration: 2000,
    });
  }

}
