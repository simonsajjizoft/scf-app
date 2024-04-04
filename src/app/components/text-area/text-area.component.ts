import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent {
  @Input() placeholder:any;
  @Input() config:any;
  @Input() editable:any;
  @Output() selectFieldEvent = new EventEmitter();
  @Output() unselectFieldEvent = new EventEmitter();
  @ViewChild('field') field: ElementRef|any;
  @ViewChild('menu') menu: ElementRef|any;
  showConfig:boolean = false;

  constructor(private renderer: Renderer2){
   
  }

  selectField(){
    if(this.editable){
      this.showConfig = true;
      this.selectFieldEvent.emit(this.config);
    }

  }
  unselectField(){
    if(this.editable) this.unselectFieldEvent.emit(this.config);
  }

  changePlaceholderText(ev:any){
    this.config.placeholder = ev?.target?.value?.trim();
  }

  editLabelText(ev:any,value:any){
    if(value?.innerText && value?.innerText?.trim() == '') value.innerHTML = '';
   }

   changeLabelText(ev:any){
    this.config.label = ev;
   }
}
