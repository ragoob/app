import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pods } from 'src/app/core/models/resources.result';
import { PodsService } from 'src/app/core/services/pods.service';
import { DeploymentsService } from '../../../core/services/deployments.service';
import { FileParserService } from '../../../core/services/file.service';
import { NotificationService } from '../../../core/services/notification.service';
import { LoadFromYamlFormComponent } from '../../shared/load-from-yaml-form/load-from-yaml-form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  constructor(private fileService: FileParserService,public dialog: MatDialog,
    private podService: PodsService, private notification: NotificationService) { }

 ngOnInit(): void {
 }


 
 public addNew(){
   const dialogRef = this.dialog.open(LoadFromYamlFormComponent, {
    width: '50%',
    height: '90%'
   });

   dialogRef.afterClosed().subscribe(result => {
     if(result && result.success){
       const pod: Pods = this.fileService.ConvertYamlToJson(result.data.yml)
       this.podService.create(pod,result.data.namespaces)
       .then(c=> {
         this.notification.success(`Pod created successfully`)
       }).catch(err=> {
         this.notification.error(JSON.stringify(err))
       })
     }
   });
 }
}
