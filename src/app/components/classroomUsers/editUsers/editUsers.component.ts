import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editUsers',
  templateUrl: './editUsers.component.html',
  styleUrls: ['./editUsers.component.css']
})
export class EditUsersComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditUsersComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data) { }



  ngOnInit() {
    console.log(this.data)
  }

  getTitle(){
    return this.data.type == "TEACHER" ? "profesores" : "alumnos"
  }
}
