import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ingresses } from 'src/app/core/models/resources.result';
import { IngressesService } from 'src/app/core/services/ingresses.service';
import { FileParserService } from '../../../core/services/file.service';
import { NotificationService } from '../../../core/services/notification.service';
import { LoadFromYamlFormComponent } from '../../shared/load-from-yaml-form/load-from-yaml-form.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  constructor(private fileService: FileParserService, public dialog: MatDialog,
    private ingressesService: IngressesService, private notification: NotificationService, public auth: AuthService) { }

  ngOnInit(): void {
  }

  public addNew() {
    const dialogRef = this.dialog.open(LoadFromYamlFormComponent, {
      width: '50%',
      height: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        const ingress: Ingresses = this.fileService.ConvertYamlToJson(result.data.yml)
        this.ingressesService.create(ingress, result.data.namespaces)
          .then(c => {
            this.notification.success(`Ingresses created successfully`)
          }).catch(err => {
            this.notification.error(JSON.stringify(err))
          })
      }
    });
  }
}
