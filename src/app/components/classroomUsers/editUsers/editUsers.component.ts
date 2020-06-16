import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-editUsers',
  templateUrl: './editUsers.component.html',
  styleUrls: ['./editUsers.component.css']
})
export class EditUsersComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditUsersComponent>, 
    @Optional() @Inject(MAT_DIALOG_DATA) public data, private classroomService:ClassroomService) { }



  ngOnInit() {
  }

  getTitle(){
    return this.data.type == "TEACHER" ? "profesores" : "alumnos"
  }

  addUser(event: string) {
    this.classroomService.addUser(this.data.id, event)
  }
}
