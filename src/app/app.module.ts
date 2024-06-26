import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { TreeViewComponent } from './components/tree-view/tree-view.component';
import { ResizableModule } from 'angular-resizable-element';
import { SharedModule } from './modules/shared/shared.module';
import { ListViewComponent } from './components/list-view/list-view.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { CardViewComponent } from './components/card-view/card-view.component';
import { ColumnResizeDirective } from './directives/column-resize.directive';
import { TreeDragDropComponent } from './components/tree-drag-drop/tree-drag-drop.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SectionComponent } from './components/section/section.component';
import { ElementComponent } from './components/element/element.component';
import { TextboxComponent } from './components/textbox/textbox.component';
import { RadioComponent } from './components/radio/radio.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { FormPreviewComponent } from './components/form-preview/form-preview.component';
import { FormsModule } from '@angular/forms';
import { LabelComponent } from './components/label/label.component';
import { DividerComponent } from './components/divider/divider.component';
import { SpacerComponent } from './components/spacer/spacer.component';
import { DatePipe } from '@angular/common';
import { NumberComponent } from './components/number/number.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
