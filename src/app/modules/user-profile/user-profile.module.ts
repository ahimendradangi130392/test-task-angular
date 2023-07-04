import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MaterialModule } from '../material.module';
import { UserProfileRoutingModule } from './user-profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MaterialModule,
  ],
  declarations: [
  ],
  providers: [
  ]
})
export class UserProfileModule { }
