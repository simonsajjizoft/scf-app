import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent {
  @Input() placeholder:any;
  @Input() config:any;
  @Output() selectFieldEvent = new EventEmitter();

  selectField(){
    this.selectFieldEvent.emit(this.config);
  }
}
