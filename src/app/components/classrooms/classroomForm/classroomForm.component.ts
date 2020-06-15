import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isUndefined } from 'util';
import { Classroom } from 'src/app/domain/classroom';
import { ClassroomService } from 'src/app/services/classroom.service';


@Component({
  selector: 'app-classroomForm',
  templateUrl: './classroomForm.component.html',
  styleUrls: ['./classroomForm.component.css']
})
export class ClassroomFormComponent implements OnInit {

  public dataForm: FormGroup
  classroom:Classroom

  constructor(private snackBar: MatSnackBar, public dialogRef: MatDialogRef<ClassroomFormComponent>,
    private biulter: FormBuilder, @Optional() @Inject(MAT_DIALOG_DATA) private data: string,
    private classroomService:ClassroomService) {

    this.dataForm = this.biulter.group({
      description: ['', Validators.required],
    })
  }

  async ngOnInit() {
    this.dialogRef.disableClose = true;
    if (this.data === "")
      this.classroom = new Classroom()
    else
      this.classroom = await this.classroomService.getClassroomById(this.data)
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.dataForm.controls[controlName].hasError(errorName)
  }

  formHasData() {
    return this.dataForm.status == 'INVALID' || isUndefined(this.classroom.subject)
  }

  saveChanges() {
    try {
      if (isUndefined(this.classroom.id))
        this.classroomService.createClassroom(this.classroom)
      else
        this.classroomService.updateClassroom(this.classroom)
    }
    catch{
      console.log("algo malio sal")
    }
  }

}
