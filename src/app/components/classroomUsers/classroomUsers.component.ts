import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/domain/user';
import { ClassroomService } from 'src/app/services/classroom.service';
import { UserService } from 'src/app/services/user.service';
import { EditUsersComponent } from './editUsers/editUsers.component';

@Component({
  selector: 'app-classroomUsers',
  templateUrl: './classroomUsers.component.html',
  styleUrls: ['./classroomUsers.component.css']
})
export class ClassroomUsersComponent implements OnInit {

  routeId:string
  users:User[]

  constructor(public dialog: MatDialog, private userService: UserService, 
    private classroomService: ClassroomService, private snackBar: MatSnackBar,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.routeId = routeParams.id   
      this.fetchUsers(false)
    })
  }

  async fetchUsers(showSnack: boolean) {
    this.users = null
    try {
      this.users = await this.classroomService.getClassroomUsers(this.routeId)
    }
    catch (e) {
      this.error(e.message)
    }
    if (showSnack)
      this.error("Modificacion realizada con exito!!")
  }

  deleteUser(event: string) {
    this.classroomService.deleteUser(this.routeId, event)
      .then( () => this.fetchUsers(true) )
    
  }

  getStudents() {
    const students = this.users.filter((user) => { return (user.role == "STUDENT") })
    return students;
  }

  editUsers(types: string) {
    const dialogRef = this.dialog.open(EditUsersComponent, {
      data: { id: this.routeId, type: types }
    })
    dialogRef.afterClosed().subscribe(() => {
      this.fetchUsers(false)
    })
  }

  getTeachers() {
    const teachers = this.users.filter((user) => { return (user.role == "TEACHER") })
    return teachers;
  }

  error(errorType: string) {
    this.snackBar.open(errorType, 'x', {
      duration: 2000,
    });
  }

}
