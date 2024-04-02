import { Component, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  @Input() cols:any;
  @Input() divs:any;
  @Input() config:any;
  @Input() idx:any;
  @Output() selectConfigEvent = new EventEmitter();
  @Output() unSelectConfigEvent = new EventEmitter();

  appendField(field:any,item:any){

    if(field == 'dropdown'){
      item.type = 'dropdown';
      item.label = "";
      item.selected = false;
      item.checked = false;
      item.values = ['Select Option','Option A','Option B']
    }
    else if(field == 'checkbox'){
      item.type = 'checkbox';
      item.label = "";
      item.selected = false;
      item.checked = false;
      item.values = ["Checkbox 1"]
    }
    else if(field == 'radio'){
      item.type = 'radio';
      item.label = "";
      item.selected = false;
      item.checked = false;
      item.values = ['Option A','Option B']
    }
    else{
      item.type = field;
      item.placeholder = 'Placeholder';
      item.label = "";
      item.selected = false;
      item.checked = false;
    }
  }

  selectConfig(config:any){
    this.selectConfigEvent.emit(config);
    console.log(this.config)

  }

  unSelectConfig(config:any){
    this.unSelectConfigEvent.emit(config);
  }

}
