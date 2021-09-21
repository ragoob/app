import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/core/models/dialog-data';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  public form: FormGroup;
  public controls: {} = {}
  public submitting: boolean = false;
  constructor( public dialogRef: MatDialogRef<DynamicFormComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.data.columns.forEach(c=> {

      this.controls[c.name] = new FormControl(this.data[c.name], c.required ? [Validators.required]: [])
    })
    this.form = new FormGroup(this.controls);
  }

  public cancel(){
    this.dialogRef.close()
  }

  public Save(){
    this.submitting = true
    if(!this.form.invalid){
      if (this.data.onSave){
        this.data.onSave.then(res=> {
          
        })
      }else{
        this.dialogRef.close({
          data: this.form.value,
          success: true
        });
      }
     
    }
   
  }
}
