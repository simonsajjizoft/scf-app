import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  layoutDropdown: boolean = false;
  layouts = [
    { id: 1, view: 'card', selected: false, name: 'Large Icons', img: 'assets/icons/folder.png' },
    { id: 2, view: 'list', selected: true, name: 'List', img: 'assets/icons/list.png' },
    { id: 3, view: 'detail', selected: false, name: 'Detail', img: 'assets/icons/detail.png' },
  ];
  layoutView = this.layouts[1];
  designs = [
    { cols: 1, divs: [{ type: '' }] },
    { cols: 2, divs: [{ type: '' }, { type: '' }] },
    { cols: 3, divs: [{ type: '' }, { type: '' }, { type: '' }] },
    { cols: 4, divs: [{ type: '' }, { type: '' }, { type: '' }, { type: '' }] }
  ];
  sections: any = []
  sidebarWidth: Number | any = 350;
  contentWidth: Number | any;
  @ViewChild('layoutModal') layoutModal: ElementRef | any;
  @HostListener('document:click', ['$event.target'])
  onClick(target: any) {
    const clickedInside = this.layoutModal.nativeElement.contains(target);
    if (!clickedInside) {
      this.layoutDropdown = false;
    }
  }

  constructor() { }

  selectLayout(layoutId: any) {
    // Unselect every item
    this.layouts.map((item: any) => {
      item.selected = false;
    });
    // select the required item
    this.layouts.map((item: any) => {
      if (item?.id === layoutId) {
        item.selected = true;
        this.layoutView = item;
      }
    });
    this.layoutDropdown = false;
  }

  onResize(event: ResizeEvent): void {
    console.log('Element was resized', event);
    if (event?.rectangle?.width && event?.rectangle?.width > 200) this.sidebarWidth = event.rectangle.width;
  }

  addLayout(design: any) {
    let tempArray = JSON.parse(JSON.stringify(design));
    tempArray.id = this.sections.length;
    this.sections.push(tempArray);
  }

  submit() {
    console.log(this.sections)
  }

  selectConfig(config: any) {
    this.unSelectAllConfigs();
    config.selected = true;
  }

  unSelectConfig(config:any){
    this.unSelectAllConfigs();
    config.selected = false;
  }

  unSelectAllConfigs() {
    this.sections.map((section: any) => {
      if (section?.divs) section.divs.map((item: any) => {
        item.selected = false;
      });
    })
  }



}
