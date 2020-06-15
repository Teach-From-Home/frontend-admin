import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/domain/user';
import { UserService } from 'src/app/services/userService';
import { isUndefined } from 'util';
import { Subject } from 'src/app/domain/subject';
import { SubjectsService } from 'src/app/services/subjects.service';

@Component({
  selector: 'app-newAsignatureForm',
  templateUrl: './newAsignatureForm.component.html',
  styleUrls: ['./newAsignatureForm.component.css']
})
export class NewAsignatureFormComponent implements OnInit {

  public dataForm: FormGroup
  subject:Subject

  constructor(private snackBar: MatSnackBar, public dialogRef: MatDialogRef<NewAsignatureFormComponent>,
    private biulter: FormBuilder, @Optional() @Inject(MAT_DIALOG_DATA) private data: string,
    private subjectService:SubjectsService) {

    this.dataForm = this.biulter.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  async ngOnInit() {
    this.dialogRef.disableClose = true;
    if (this.data === "")
      this.subject = new Subject()
    else
      this.subject = await this.subjectService.getSubjectById(this.data)
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.dataForm.controls[controlName].hasError(errorName)
  }

  formHasData() {
    return this.dataForm.status == 'INVALID'
  }

  saveChanges() {
    try {
      if (isUndefined(this.subject.id))
        this.subjectService.createSubject(this.subject)
      else
        this.subjectService.updateSubject(this.subject)
    }
    catch{
      console.log("algo malio sal")
    }
  }

}
