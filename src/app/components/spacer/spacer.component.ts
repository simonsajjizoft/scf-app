import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spacer',
  templateUrl: './spacer.component.html',
  styleUrls: ['./spacer.component.scss']
})
export class SpacerComponent {
  @Input() config:any;
  @Input() idx:any;


}
