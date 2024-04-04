import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-spacer',
  templateUrl: './spacer.component.html',
  styleUrls: ['./spacer.component.scss']
})
export class SpacerComponent {
  @Input() config:any;
  @Input() idx:any;
  @Input() sectionIdx:any;
  @Input() editable:any;
  @Output() unselectFieldEvent = new EventEmitter();
  @Output() selectFieldEvent = new EventEmitter();
  @Output() deleteItemEvent = new EventEmitter();
  showConfig:any;
  
  selectField(){
    if(this.editable){
      this.showConfig = true;
      this.selectFieldEvent.emit(this.config);
    }
  }

  unselectField(){
    if(this.editable) this.unselectFieldEvent.emit(this.config);
  }

  changeHtValue(ev:any){
    this.config.height = ev?.target?.value?.trim();
  }
}
