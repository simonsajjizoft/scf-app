import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent {
  @Input() placeholder: any;
  @Input() config: any;
  @Input() editable: any;
  @Input() idx: any;
  @Output() selectFieldEvent = new EventEmitter();
  @Output() unselectFieldEvent = new EventEmitter();
  @Output() deleteItemEvent = new EventEmitter();
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

  changeMin(ev: any) {
    this.config.min = ev?.target?.value?.trim();
  }

  changeMax(ev: any) {
    this.config.max = ev?.target?.value?.trim();
  }

  deleteItem() {
    this.deleteItemEvent.emit(this.idx);
  }

  validate() {
    this.config.value = this.valBetween(this.config?.value, this.config?.min, this.config?.max);
  }

  valBetween(v: any, min: any, max: any) {
    return (Math.min(max, Math.max(min, v)));
  }

  restrictNumberInput(input:any) {
    var value = input.value;
    if (Number(value) < Number(this.config?.min) && this.config.min) {
      input.value = this.config?.min;
    } 
    else if (Number(value) > Number(this.config?.max) && this.config.max) {
      input.value = this.config?.max;
    }
    else input.value = value;
  }

}
