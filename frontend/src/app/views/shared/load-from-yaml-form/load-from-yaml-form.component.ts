import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectItem } from 'primeng/api';
import { DialogData } from 'src/app/core/models/dialog-data';
import { FileParserService } from 'src/app/core/services/file.service';
import { NameSpaceService } from 'src/app/core/services/namespace.service';

@Component({
  selector: 'app-load-from-yaml-form',
  templateUrl: './load-from-yaml-form.component.html',
  styleUrls: ['./load-from-yaml-form.component.scss']
})
export class LoadFromYamlFormComponent implements OnInit {
  public form: FormGroup;
  public submitting: boolean = false;
  public nameSpaces: SelectItem[] = []

  constructor( private fb: FormBuilder,public dialogRef: MatDialogRef<LoadFromYamlFormComponent>,
    private fileService: FileParserService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private nameSpaceService: NameSpaceService
    
    ) { }

  ngOnInit(): void {
    this.nameSpaceService.get().then(res=> {
      res.data.items
      .forEach(n=> {
        this.nameSpaces.push({
          label: n.metadata.name,
          value: n.metadata.name,
        })
      })

      if(this.nameSpaceService.NameSpacesId() && this.nameSpaceService.NameSpacesId()  != 'all'){
        this.form.controls['namespaces'].setValue(this.nameSpaceService.NameSpacesId())
      }else{
        this.form.controls['namespaces'].setValue(this.nameSpaces[0].value)
      }
     
    })
    this.form = this.fb.group({
      yml: new FormControl('',[Validators.required]),
      namespaces: new FormControl(''),
    })
  }

  public async fileChanged(e) {
    const content = await this.fileService.ParseFileContentToString(e)
    this.form.controls['yml'].setValue(content)
   }


  public cancel(){
    this.dialogRef.close()
  }

  public Save(){
    this.submitting = true
    if(!this.form.invalid){
      this.dialogRef.close({
        data: this.form.value,
        success: true
      });
     
    }
   else{
     Object.keys( this.form.controls)
     .forEach(k=> {
      this.form.controls[k].markAsDirty()
      this.form.controls[k].markAsTouched()
     })
   }
  }

}
