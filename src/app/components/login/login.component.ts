import { Component, OnInit, Inject } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { SessionService } from '../../services/session.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { User } from 'src/app/domain/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  public loginForm: FormGroup
  userCredentials:User

  constructor(private router: Router,private sessionService: SessionService, private snackBar: MatSnackBar, private biulter: FormBuilder) {
    this.loginForm = this.biulter.group({
      dni: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.userCredentials = new User
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName)
  }

  async authenticate() {
    try{
      await this.sessionService.authenticate(this.userCredentials)
      this.router.navigate(['home'])
    }
    catch(e){
      console.log (e)
      this.error(e.error.error)
    }

  }
  formHasData(){
    return this.loginForm.status == 'INVALID'
  }

  error(errorType:string) {
    this.snackBar.open(errorType, 'x', {
      duration: 2000,
    });
  }
}
