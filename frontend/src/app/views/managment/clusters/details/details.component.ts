import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { ClustersService } from 'src/app/core/services/clusters.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public id: string = ""
  public submitting: boolean = false;
  public myForm: FormGroup;
  public title: string = ''
  public users: SelectItem[] = []
  public permissions: SelectItem[] = [{
    label: "Read Only",
    value: "ReadOnly"
  },

  {
    label: "Read and Write",
    value: "ReadWrite"
  },
  {
    label: "Cluster Manager",
    value: "ClusterManager"
  }

  ]

  constructor(private clusterService: ClustersService, private activatedRoute: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder, private userService: UserService, private notification: NotificationService,public auth: AuthService) {
    this.myForm = this.fb.group({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      registerScript: new FormControl(''),
      users: this.fb.array([
      ])
    })
  }

  ngOnInit(): void {
    this.userService.get()
      .then(res => {
        res.forEach(u => {
          this.users.push({
            label: u.userName,
            value: u.userId
          });


        })

        this.activatedRoute.params.subscribe((params: Params) => {
          if (params.id) {
            this.id = params.id;
            this.load(params.id)
            this.title = `Cluster Details ${params.id}`
          } else {
            this.title = "Register new Cluster"
          }
        });
      })
    


  }

  public Delete(){
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete '${this.myForm.controls["name"].value}' ?`,
      accept: () => {
        this.clusterService.Delete(this.myForm.controls["name"].value)
    .then(res=> {
      this.clusterService.get()
    .then(res=> this.clusterService.akaMenu$.next(res))
      this.notification.success("Deleted successfully")
      this.router.navigate(["/managment/clusters"])
    })
      }
  });

   
  }


  get usersFormArr(): FormArray {
    return this.myForm.get('users') as FormArray;
  }

  public addNewUser() {
    this.usersFormArr.push(
      this.fb.group({
        userId: new FormControl('', [Validators.required]),
        permissons: new FormControl('', [Validators.required])
      })
    );
  }

  public deleteUser(index) {
    this.usersFormArr.removeAt(index)
  }


  public Back() {
   this.router.navigate(['/managment/clusters'])
  }


  private load(id: string): void {

    this.clusterService.getById(id)
      .then(res => {
        if (res.data.length > 0) {
          this.myForm.controls["name"].setValue(res.data[0].name)
          this.myForm.controls["id"].setValue(res.data[0].id)
          this.myForm.controls["registerScript"].setValue(res.data[0].registerScript)
          this.usersFormArr.clear()
          if (res.data[0].users && res.data[0].users.length > 0) {
            res.data[0].users
              .forEach(u => {
                this.usersFormArr.push(
                  this.fb.group({
                    userId: new FormControl(u.userId, [Validators.required]),
                    permissons: new FormControl(u.permissons, [Validators.required])
                  })
                );
              })

          }
        }
      })
  }

  public Save(callBack?: Function) {
    this.submitting = true
    if (!this.myForm.invalid) {
      (this.id ? this.clusterService.Update(this.myForm.value) : this.clusterService.Create(this.myForm.value))
        .then(res => {
          this.clusterService.get()
          .then(res=> this.clusterService.akaMenu$.next(res))
          this.notification.success("Saved Successfully")
          if(callBack){
            callBack()
          }else{
            this.router.navigate(["/managment/clusters"])
          }
          
        })
    }
    else {
      Object.keys(this.myForm.controls)
        .forEach(k => {
          this.myForm.controls[k].markAsDirty()
          this.myForm.controls[k].markAsTouched()
        })
      this.usersFormArr.markAllAsTouched()
      this.usersFormArr.markAsDirty()
    }
  }

  public SaveAndContinue(){
   this.Save(()=> {
     if(this.id){
      this.load(this.myForm.controls["name"].value)
     }else{
       this.router.navigate(["/managment/clusters/details/",this.myForm.controls["name"].value])
     }
    
   })
  }

}
