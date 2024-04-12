import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent {
  @Input() placeholder: any;
  @Input() config: any;
  @Input() editable: any;  
  @Input() idx: any;
  @Output() deleteItemEvent = new EventEmitter();
  @Output() selectFieldEvent = new EventEmitter();
  @Output() unselectFieldEvent = new EventEmitter();
  @ViewChild('field') field: ElementRef | any;
  @ViewChild('menu') menu: ElementRef | any;
  showConfig: boolean = false;

  constructor(private renderer: Renderer2) {

  }

  selectField() {
    if (this.editable) {
      this.showConfig = true;
      this.selectFieldEvent.emit(this.config);
    }

  }
  unselectField() {
    if (this.editable) this.unselectFieldEvent.emit(this.config);
  }

  changePlaceholderText(ev: any) {
    this.config.placeholder = ev?.target?.value?.trim();
  }

  editLabelText(ev: any, value: any) {
    if (value?.innerText && value?.innerText?.trim() == '') value.innerHTML = '';
  }

  changeLabelText(ev: any) {
    this.config.label = ev;
  }

  deleteItem() {
    this.deleteItemEvent.emit(this.idx);
  }

  changeMinText(ev:any){
    this.config.minLength = ev?.target?.value?.trim();
  }

  changeMaxText(ev:any){
    this.config.maxLength = ev?.target?.value?.trim();
  }

  changeCols(ev:any){
    this.config.cols = ev?.target?.value?.trim();
  }
  changeRows(ev:any){
    this.config.rows = ev?.target?.value?.trim();
  }

}
