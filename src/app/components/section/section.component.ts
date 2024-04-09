import { AfterViewInit, Component, ElementRef, EventEmitter, OnChanges, Output, Renderer2, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { TextAreaComponent } from '../text-area/text-area.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements AfterViewInit,OnChanges {
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
  @ViewChild('elementitem') elementitem:ElementRef|any;
  showSectionOptions:boolean = false;
  designs = [
    { cols: 1, divs: [{ type: '' }] ,selected:false},
    { cols: 2, divs: [{ type: '' }, { type: '' }] ,selected:false},
    { cols: 3, divs: [{ type: '' }, { type: '' }, { type: '' }],selected:false },
    { cols: 4, divs: [{ type: '' }, { type: '' }, { type: '' }, { type: '' }],selected:false }
  ];

  constructor(private renderer: Renderer2){


  }

  ngOnChanges(){
  }

  ngAfterViewInit(){
    this.renderer.listen('window', 'click',(e:Event)=>{
      if(e.target !== this.section?.nativeElement){
          this.config.selected=false;
      }
      if(e.target!= this.elementitem?.nativeElement){
        this.config.divs.map((div:any)=>{
          div.selected = false;
        })
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
      item.values = ["Choice 1"];
      item.required = false;
      item.allowInput = true;
      item.cols = '2';
    }
    else if (field == 'radio') {
      item.type = 'radio';
      item.label = "";
      item.selected = false;
      item.checked = false;
      item.values = ['option A'];
      item.required = false;
      item.allowInput = true;
      item.cols = '2';
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
  }

  unSelectConfig(config: any) {
    this.unSelectConfigEvent.emit(config);
  }

  deleteItem(itemIdx:any) {
    this.config?.divs.map((div: any, idx: any) => {
      if (idx == itemIdx) {
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
    this.selectSectionEvent.emit(this.config);
    this.config.divs.map((item:any)=>{
      item.selected = false;
    });
  }

  unSelectSection(){
    this.unSelectSectionEvent.emit(this.config)
  }

  assignLayout(design:any){
    let tempArray = JSON.parse(JSON.stringify(design));
    tempArray.id = this.config.id;
    if(design) this.config = tempArray;
  }

  selectElement(element:any){
    this.unSelectSectionEvent.emit(this.config)
    this.config.divs.map((item:any)=>{
      item.selected = false;
    });
    this.unSelectConfig(this.config)
    element.selected = true;

  }

}
