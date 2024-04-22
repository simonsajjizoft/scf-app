import { Component,ElementRef,EventEmitter,Input,Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Input() config:any;
  @Input() editable:any;
  @Input() idx:any;
  @Output() selectFieldEvent = new EventEmitter();
  @Output() unselectFieldEvent = new EventEmitter();
  @Output() deleteItemEvent = new EventEmitter();
  status: "initial" | "uploading" | "success" | "fail" = "initial"; // Variable to store file status
  file: File | null = null; // Variable to store file
  @ViewChild('field') field: ElementRef|any;
  @ViewChild('menu') menu: ElementRef|any;
  showConfig:boolean = false;

  constructor(private renderer: Renderer2){
   
  }

  selectField(){
    if(this.editable){
      this.showConfig = true;
      this.selectFieldEvent.emit(this.config);
    }

  }

  unselectField(){
    if(this.editable) this.unselectFieldEvent.emit(this.config);
  }

   changeLabelText(ev:any){
    this.config.label = ev;
   }

   changeMinText(ev:any){
    this.config.minLength = ev?.target?.value?.trim();
  }

  changeMaxText(ev:any){
    this.config.maxLength = ev?.target?.value?.trim();
  }

  deleteItem(){
    this.deleteItemEvent.emit(this.idx);
   }

  ngOnInit(): void {}

  // On file Select
  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.status = "initial";
      this.file = file;
    }
  }

  onUpload() {
    // we will implement this method later
  }

}
