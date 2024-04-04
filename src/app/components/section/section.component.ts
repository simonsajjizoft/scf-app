import { Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  @Input() cols: any;
  @Input() divs: any;
  @Input() config: any;
  @Input() idx: any;
  @Output() selectConfigEvent = new EventEmitter();
  @Output() unSelectConfigEvent = new EventEmitter();
  @Output() deleteSectionEvent = new EventEmitter();
  @Output() selectSectionEvent = new EventEmitter();
  @Output() unSelectSectionEvent = new EventEmitter();
  @ViewChild('section') section:ElementRef | any;
  showSectionOptions:boolean = false;

  constructor(private renderer: Renderer2){
    this.renderer.listen('window', 'click',(e:Event)=>{
     if(e.target !== this.section?.nativeElement){
         this.config.selected=false;
     }
 });

  }

  appendField(field: any, item: any) {
    if (field == 'dropdown') {
      item.type = 'dropdown';
      item.label = "";
      item.selected = false;
      item.checked = false;
      item.values = ['Select Option', 'Option A', 'Option B'];
      item.required = false;
      item.allowInput = true;
    }
    else if (field == 'checkbox') {
      item.type = 'checkbox';
      item.label = "";
      item.selected = false;
      item.checked = false;
      item.values = ["Checkbox 1"];
      item.required = false;
      item.allowInput = true;
    }
    else if (field == 'radio') {
      item.type = 'radio';
      item.label = "";
      item.selected = false;
      item.checked = false;
      item.values = ['option A', 'option B'];
      item.required = false;
      item.allowInput = true;
    }
    else if (field == 'textbox') {
      item.type = field;
      item.placeholder = 'Placeholder';
      item.label = "";
      item.selected = false;
      item.checked = false;
      item.required = false;
      item.minLength = "";
      item.maxLength = "";
      item.allowInput = true;
    }
    else if (field == 'textarea') {
      item.type = field;
      item.placeholder = 'Placeholder';
      item.label = "";
      item.selected = false;
      item.checked = false;
      item.required = false;
      item.minLength = "";
      item.maxLength = "";
      item.allowInput = true;
    }
    else if (field == 'datepicker') {
      item.type = field;
      item.placeholder = 'Placeholder';
      item.label = "";
      item.selected = false;
      item.checked = false;
      item.required = false;
      item.minLength = "";
      item.maxLength = "";
      item.allowInput = true;
    }
    else {
      item.type = field;
      item.label = "";
      item.selected = false;
      item.checked = false;
      item.required = false;
      item.allowInput = true;
    }
  }

  selectConfig(config: any) {
    this.selectConfigEvent.emit(config);
    console.log(this.config)

  }

  unSelectConfig(config: any) {
    this.unSelectConfigEvent.emit(config);
  }

  deleteItem(itemIdx:any) {
    this.config?.divs.map((div: any, idx: any) => {
      if (idx == itemIdx) {
        console.log(div)
        this.deletePropertiesExceptType(div);
      }
    });
  }

  deleteSection(idx:any){
    this.deleteSectionEvent.emit(idx)
  }

  deletePropertiesExceptType(obj:any) {
    for (const [key, value] of Object.entries(obj))  {
      if (key !== 'type') delete obj[key];
      else obj.type = '';
    }
  }

  selectSection(){
   if(!this.config.selected){
    this.selectSectionEvent.emit(this.config);
   } 
   else{
    this.unSelectSectionEvent.emit(this.config)
   } 
  }

  unSelectSection(){
    this.unSelectSectionEvent.emit(this.config)
  }

}
