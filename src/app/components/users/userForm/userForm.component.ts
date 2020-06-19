import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/domain/user';
import { UserService } from 'src/app/services/user.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-userForm',
  templateUrl: './userForm.component.html',
  styleUrls: ['./userForm.component.css']
})
export class UserFormComponent implements OnInit {

  public dataForm: FormGroup
  user:User
  hide:boolean=true

  constructor(private snackBar: MatSnackBar, public dialogRef: MatDialogRef<UserFormComponent>,
    private biulter: FormBuilder, @Optional() @Inject(MAT_DIALOG_DATA) private data: string,
    private userService: UserService) {

    this.dataForm = this.biulter.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', Validators.required],
    })
  }

  async ngOnInit() {
    this.dialogRef.disableClose = true;
    if (this.data === "")
      this.user = new User()
    else
      this.user = await this.userService.getUserById(this.data)
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.dataForm.controls[controlName].hasError(errorName)
  }

  formHasData() {
    return this.dataForm.status == 'INVALID' || isUndefined(this.user.role)
  }

  error(errorMessage: string) {
    this.snackBar.open(errorMessage, 'dismiss', {
      duration: 2000,
    });
  }

  saveChanges() {
    try {
      if (isUndefined(this.user.id))
        this.userService.createUser(this.user)
      else
        this.userService.updateUser(this.user)
    }
    catch{
      this.error("algo malio sal")
    }
  }

  getUser(){
    return !isUndefined(this.user)
  }

  isTeacher(){
    return this.user.role==="TEACHER"
  }
}
