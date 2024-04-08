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
import {MatTooltipModule} from '@angular/material/tooltip';
import { FormPreviewComponent } from 'src/app/components/form-preview/form-preview.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { LabelComponent } from 'src/app/components/label/label.component';
import { SpacerComponent } from 'src/app/components/spacer/spacer.component';
import { DividerComponent } from 'src/app/components/divider/divider.component';
import { TextAreaComponent } from 'src/app/components/text-area/text-area.component';
import { DatePickerComponent } from 'src/app/components/date-picker/date-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
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
    FormPreviewComponent,
    LabelComponent,
    SpacerComponent,
    DividerComponent,
    TextAreaComponent,
    DatePickerComponent
        
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
    MatProgressBarModule,
    MatTooltipModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule
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
    MatTooltipModule,
    FormPreviewComponent,
    MatDialogModule,
    MatSlideToggleModule,
    LabelComponent,
    SpacerComponent,
    DividerComponent,
    TextAreaComponent,
    DatePickerComponent
  ]
})
export class SharedModule { }
