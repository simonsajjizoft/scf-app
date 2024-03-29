import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() config:any;

  editLabelText(ev:any,value:any){
    if(value?.innerText && value?.innerText?.trim() == '') value.innerHTML = '';
   }
}
