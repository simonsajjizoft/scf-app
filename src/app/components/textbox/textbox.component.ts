import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent {
  @Input() placeholder:any;
  @Input() config:any;
  @Output() selectFieldEvent = new EventEmitter();
  @Output() unselectFieldEvent = new EventEmitter();
  @ViewChild('field') field: ElementRef|any;
  @ViewChild('menu') menu: ElementRef|any;
  showConfig:boolean = false;

  constructor(private renderer: Renderer2){
   
  }

  selectField(){
    this.showConfig = true;
    this.selectFieldEvent.emit(this.config);
  }

  unselectField(){
    this.unselectFieldEvent.emit(this.config);
  }

  changePlaceholderText(ev:any){
    this.config.placeholder = ev?.target?.value?.trim();
  }

  editLabelText(ev:any,value:any){
    if(value?.innerText && value?.innerText?.trim() == '') value.innerHTML = '';
   }

}
