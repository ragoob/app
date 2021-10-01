import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/core/models/dialog-data';
import { Deployments } from 'src/app/core/models/resources.result';
import { AuthService } from 'src/app/core/services/auth.service';
import { DeploymentsService } from 'src/app/core/services/deployments.service';
import { FileParserService } from 'src/app/core/services/file.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { parse, stringify } from 'yaml'
import { LoadFromYamlFormComponent } from '../../shared/load-from-yaml-form/load-from-yaml-form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private fileService: FileParserService,public dialog: MatDialog,
     private deploymentService: DeploymentsService, private notification: NotificationService,public auth: AuthService) { }

  ngOnInit(): void {
  }


  public addNew(){
    const dialogRef = this.dialog.open(LoadFromYamlFormComponent, {
     width: '50%',
     height: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.success){
        const deployment: Deployments = this.fileService.ConvertYamlToJson(result.data.yml)
        this.deploymentService.create(deployment,result.data.namespaces)
        .then(c=> {
          this.notification.success(`Deployment created successfully`)
        }).catch(err=> {
          this.notification.error(JSON.stringify(err))
        })
      }
    });
  }

  
}
