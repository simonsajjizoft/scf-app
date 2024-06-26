import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResizeEvent } from 'angular-resizable-element';
import { FormPreviewComponent } from 'src/app/components/form-preview/form-preview.component';

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
    { cols: 1, divs: [{ elements:[] }] ,selected:false},
    { cols: 2, divs: [{elements:[]}, { elements:[] }] ,selected:false},
    { cols: 3, divs: [{elements:[] }, { elements:[] }, { elements:[] }],selected:false },
    { cols: 4, divs: [{elements:[]}, { elements:[] }, {elements:[]}, {elements:[] }],selected:false }
  ];
  sections: any = []
  sidebarWidth: Number | any = 350;
  contentWidth: Number | any;
  formTitle = '';
  formDescription = '';
  @ViewChild('layoutModal') layoutModal: ElementRef | any;

  constructor(private dialog: MatDialog) { }

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
    if (event?.rectangle?.width && event?.rectangle?.width > 200) this.sidebarWidth = event.rectangle.width;
  }

  addLayout(design: any) {
    setTimeout(() => {
      design.selected = true;
      this.unSelectAllConfigs()
      let tempArray = JSON.parse(JSON.stringify(design));
      tempArray.id = this.sections.length;
      this.sections.push(tempArray);
    }, 10)
  }

  submit() {}

  selectConfig(config: any) {
    this.unSelectAllConfigs();
    config.selected = true;
  }

  unSelectConfig(config: any) {
    this.unSelectAllConfigs();
    config.selected = false;
  }

  unSelectAllConfigs() {
    this.sections.map((section: any) => {
      section?.divs?.map((item: any) => {
        item.selected = false;
      });
    })

  }

  openDialog() {
    const dialogRef = this.dialog.open(FormPreviewComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { sections: this.sections, formTitle: this.formTitle, formDescription: this.formDescription }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  addDivider() {
    let obj = { cols: 1, divs: [{ type: 'divider' }] };
    let tempArray = JSON.parse(JSON.stringify(obj));
    tempArray.id = this.sections.length;
    this.sections.push(tempArray);
  }

  deleteSection(idx: any) {
    this.sections.map((section: any, i: any) => {
      if (i == idx) this.sections.splice(i, 1)
    });
  }

  addSpacer() {
    let obj = { cols: 1, divs: [{ type: 'spacer', height: '32' }] };
    let tempArray = JSON.parse(JSON.stringify(obj));
    tempArray.id = this.sections.length;
    this.sections.push(tempArray);
  }

  selectSection(section: any) {
    this.unSelectAllConfigs();
    this.sections.map((section: any) => {
      section.selected = false;
    })
    section.selected = true;
  }

  unSelectSection(section: any) {
    this.sections.map((section: any) => {
      section.selected = false;
    })
    section.selected = false;
  }

  reset() {
    this.formTitle = '';
    this.formDescription = '';
    this.sections = [];
  }


}
