import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './components/landing/landing.component';
import { MaterialModule } from './material.module';
import { UsersComponent } from './components/users/users.component';
import { YesNoModalComponent } from './components/yesNoModal/yesNoModal.component';
import { UserService } from './services/userService';
import { HttpClientModule } from '@angular/common/http';
import { UserFormComponent } from './components/users/userForm/userForm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    UsersComponent,
    YesNoModalComponent,
    UserFormComponent,
  ],

  entryComponents: [
    YesNoModalComponent,
    UserFormComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule { }
