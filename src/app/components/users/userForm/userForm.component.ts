import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/domain/user';

@Component({
  selector: 'app-userForm',
  templateUrl: './userForm.component.html',
  styleUrls: ['./userForm.component.css']
})
export class UserFormComponent implements OnInit {

  public dataForm: FormGroup
  user = new User


  constructor(private snackBar: MatSnackBar,public dialogRef: MatDialogRef<UserFormComponent>, private biulter: FormBuilder) { 
    this.dataForm = this.biulter.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', Validators.required]
    })

    //this.user = usurService.getUserById(id)
  }

  ngOnInit() {
    this.dialogRef.disableClose = true;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.dataForm.controls[controlName].hasError(errorName)
  }

  formHasData(){
    return this.dataForm.status == 'INVALID'
  }

  error(errorMessage:string) {
    this.snackBar.open(errorMessage, 'dismiss', {
      duration: 2000,
    });
  }
}
