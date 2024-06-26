import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {
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
  formattedDate: string|any;
;
  selectedDate= new Date(); 
  constructor(private renderer: Renderer2,  private datePipe: DatePipe) {
  }

  ngOnInit(){
  }

  selectField($event: any) {

    if (this.editable) {
      this.showConfig = true;
      this.selectFieldEvent.emit(this.config);
    }
    else $event.stopPropagation();

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

  changeMinDate(ev: any) {
    this.config.minDate = ev?.target?.value?.trim();
  }

  changeMaxDate(ev: any) {
    this.config.maxDate = ev?.target?.value?.trim();
  }

  deleteItem() {
    this.deleteItemEvent.emit(this.idx);
  }

}
