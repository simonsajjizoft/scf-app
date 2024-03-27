import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ResizableModule } from 'angular-resizable-element';
import { SharedModule } from '../shared/shared.module';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ResizableModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    SharedModule

  ]
})
export class HomeModule { }
