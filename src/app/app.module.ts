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

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    UsersComponent,
    YesNoModalComponent,
  ],

  entryComponents: [
    YesNoModalComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule { }
