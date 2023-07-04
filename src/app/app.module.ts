import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './modules/auth/components/login.component';
import { MaterialModule } from './modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from './core/services/local-storage.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserProfileComponent } from './modules/user-profile/components/user-profile.component';
import { AuthGuard } from './core/services/auth-guard.service';
import { NavMenuComponentComponent } from './modules/nav-menu-component/nav-menu-component.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserProfileComponent,
    NavMenuComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot()

  ],
  providers: [
    LocalStorageService,
    ToastrService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
