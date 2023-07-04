import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  CommonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,

];

@NgModule({
  imports: modules,
  exports: modules,
  declarations: [
  ],
})
export class MaterialModule {}
