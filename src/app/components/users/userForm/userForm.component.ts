import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-userForm',
  templateUrl: './userForm.component.html',
  styleUrls: ['./userForm.component.css']
})
export class UserFormComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  commonValidator = new FormControl('', [
    Validators.required,
  ]);
  
  constructor(private snackBar: MatSnackBar,public dialogRef: MatDialogRef<UserFormComponent>) { }

  ngOnInit() {
    this.dialogRef.disableClose = true;
  }
  
  error(errorMessage:string) {
    this.snackBar.open(errorMessage, 'dismiss', {
      duration: 2000,
    });
  }
  
}
