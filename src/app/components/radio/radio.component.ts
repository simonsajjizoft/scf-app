import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent {
  @Input() config:any;
  @Input() idx:any;
  @Input() checkedField:any;
  @HostBinding('style.width') public width: string|any = '50%';
  @ViewChild('field') field: ElementRef|any; 
  @ViewChild('tArea') tArea:ElementRef|any;
  @Output() selectFieldEvent = new EventEmitter();
  @Output() fieldValueChange = new EventEmitter();
  @Output() checkItemEvent = new EventEmitter();
  @Output() swapElement = new EventEmitter();
  showProperties:any;
  constructor(private changeDetectorRef: ChangeDetectorRef,
    private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target != this.field.nativeElement && !this.field.nativeElement.contains(e.target)) {
        this.showProperties = false;
        this.selectFieldEvent.emit({item :this.config,id: this.idx,selected:false});
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  ngOnInit(): void {
    if (this.config?.col == 12) this.width = '100%';
    else if (this.config?.col == 6) this.width = '50%';
    else this.width = '25%';
  }

  addOption(idx: any) {
    this.config?.values.push('Option ' + (this.config?.values?.length + 1))
  }

  deleteOption(opt:any) {
    this.config?.values.map((item:any, index:any) => {
      if (item == opt) this.config?.values.splice(index, 1);
    })
  }

  displayOptions(focus:any) {
    if(this.config?.selected != focus){
      if(focus){
        this.showProperties = focus;
        this.selectFieldEvent.emit({item :this.config,id: this.idx,selected:true});
       }
      //  else{
      //   this.showProperties = focus;
      //   this.selectFieldEvent.emit({item :this.config,id: this.idx,selected:false});
      //  } 
     }
  }

  checkItem(item:any){
    // item.selected = !item?.selected;
    this.checkItemEvent.emit({item :item,id: this.idx,checked:item?.checked});
   }

   labelChange(label:any){
    this.config.label = label;
    this.fieldValueChange.emit({item :this.config,id: this.config?.id});
   }

   swap(){
    this.swapElement.emit({item :this.config,id: this.config?.id});
   }

   autoResizingTArea(){
    this.tArea.nativeElement.style.height = 'auto';
    this.tArea.nativeElement.style.height = `${this.tArea.nativeElement?.scrollHeight}px`;
   }
}
