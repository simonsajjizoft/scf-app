import { Component } from '@angular/core';
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

  appendField(field:any,item:any){

    if(field == 'dropdown'){
      item.type = 'dropdown';
      item.label = "Question";
      item.selected = false;
      item.checked = false;
      item.values = ['Select Option','Option B','Option B']
    }
    else if(field == 'checkbox'){
      item.type = 'checkbox';
      item.label = "Question";
      item.selected = false;
      item.checked = false;
      item.values = ["Checkbox 1"]
    }
    else{
      item.type = field;
      item.placeholder = 'Placeholder';
    }
  }

}
