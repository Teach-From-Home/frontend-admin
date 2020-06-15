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
import { SubjectsComponent } from './components/users/subjects/subjects.component';
import { AsignaturesComponent } from './components/asignatures/asignatures.component';
import { NewAsignatureFormComponent } from './components/asignatures/newAsignatureForm/newAsignatureForm.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    UsersComponent,
    YesNoModalComponent,
    UserFormComponent,
    SubjectsComponent,
    AsignaturesComponent,
    NewAsignatureFormComponent,
  ],

  entryComponents: [
    YesNoModalComponent,
    UserFormComponent,
    NewAsignatureFormComponent,
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
