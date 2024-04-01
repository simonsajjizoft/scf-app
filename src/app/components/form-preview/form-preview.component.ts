import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.scss']
})
export class FormPreviewComponent {
  sections:any;
  constructor( 
    public dialogRef: MatDialogRef<FormPreviewComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.sections = data?.sections;
     } 

     onCancel(): void { 
      this.dialogRef.close(); 
    } 

}
