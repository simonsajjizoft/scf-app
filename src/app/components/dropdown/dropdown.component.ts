import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() config: any;
  @Input() editable: any;

  editLabelText(ev: any, value: any) {
    if (value?.innerText && value?.innerText?.trim() == '') value.innerHTML = '';
  }

  changeLabelText(ev: any) {
    this.config.label = ev;
  }

}
