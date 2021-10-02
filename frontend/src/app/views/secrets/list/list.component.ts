import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Secrets } from 'src/app/core/models/resources.result';
import { AuthService } from 'src/app/core/services/auth.service';
import { SecretsService } from 'src/app/core/services/secrets.service';
import { FileParserService } from 'src/app/core/services/file.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { LoadFromYamlFormComponent } from '../../shared/load-from-yaml-form/load-from-yaml-form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private fileService: FileParserService,public dialog: MatDialog,
     private secretService: SecretsService, private notification: NotificationService,public auth: AuthService) { }

  ngOnInit(): void {
  }


  public addNew(){
    const dialogRef = this.dialog.open(LoadFromYamlFormComponent, {
     width: '50%',
     height: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.success){
        const secret: Secrets = this.fileService.ConvertYamlToJson(result.data.yml)
        this.secretService.create(secret,result.data.namespaces)
        .then(c=> {
          this.notification.success(`Secret created successfully`)
        }).catch(err=> {
          this.notification.error(JSON.stringify(err))
        })
      }
    });
  }

  
}
