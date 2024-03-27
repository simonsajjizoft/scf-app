import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizableModule } from 'angular-resizable-element';
import { LoginComponent } from 'src/app/components/login/login.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TreeViewComponent } from 'src/app/components/tree-view/tree-view.component';
import { ListViewComponent } from 'src/app/components/list-view/list-view.component';
import { DetailViewComponent } from 'src/app/components/detail-view/detail-view.component';
import { CardViewComponent } from 'src/app/components/card-view/card-view.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ColumnResizeDirective } from 'src/app/directives/column-resize.directive';
import { MaterialModule } from '../material/material.module';
import {MatTreeModule} from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TreeDynamicComponent } from 'src/app/components/tree-dynamic/tree-dynamic.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TreeDragDropComponent } from 'src/app/components/tree-drag-drop/tree-drag-drop.component';
import { SectionComponent } from 'src/app/components/section/section.component';
import { TextboxComponent } from 'src/app/components/textbox/textbox.component';
import { RadioComponent } from 'src/app/components/radio/radio.component';
import { DropdownComponent } from 'src/app/components/dropdown/dropdown.component';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';

@NgModule({
  declarations: [
    LoginComponent,
    HeaderComponent,
    TreeViewComponent,
    ListViewComponent,
    DetailViewComponent,
    CardViewComponent,
    ColumnResizeDirective,
    TreeDynamicComponent,
    TreeDragDropComponent,
    SectionComponent,
    TextboxComponent,
    RadioComponent,
    DropdownComponent,
    CheckboxComponent,
    
  ],
  imports: [
    CommonModule,
    ResizableModule,
    FormsModule,
    RouterModule,
    ResizableModule,
    MaterialModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule

  ],
  exports:[
    CommonModule,
    ResizableModule,
    LoginComponent,
    HeaderComponent,
    TreeViewComponent,
    ListViewComponent,
    DetailViewComponent,
    CardViewComponent,
    RouterModule,
    ResizableModule,
    ColumnResizeDirective,
    MatTreeModule,
    MaterialModule,
    MatIconModule,
    MatButtonModule,
    TreeDynamicComponent,
    MatProgressBarModule,
    TreeDragDropComponent,
    SectionComponent,
    TextboxComponent,
    RadioComponent,
    DropdownComponent,
    CheckboxComponent,
  ]
})
export class SharedModule { }