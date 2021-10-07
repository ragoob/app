import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public userId: string = ""
  public submitting: boolean = false;
  public myForm: FormGroup;
  public title: string = ''
 

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,private notification: NotificationService,public auth: AuthService) {
    this.myForm = this.fb.group({
      userId: new FormControl(''),
      userName: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
      isAdmin:  new FormControl(false, [Validators.required]),
     
    })
  }

  ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
          if (params.id) {
            this.userId = params.id;
            this.myForm.controls["Password"].clearValidators()
            this.load(params.id)
            this.title = `User Details ${params.id}`
          } else {
            this.title = "Register new User"
          }
        });
    
    


  }

  public Delete(){
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete '${this.myForm.controls["userName"].value}' ?`,
      accept: () => {
        this.userService.delete(this.myForm.controls["userName"].value)
    .then(res=> {
      this.userService.get()
      this.notification.success("Deleted successfully")
      this.router.navigate(["/managment/users"])
    })
      }
  });

   
  }


  public Back() {
   this.router.navigate(['/managment/users'])
  }


  private load(id: string): void {

    this.userService.getById(id)
      .then(res => {
        if (res != null) {
          this.myForm.controls["userName"].setValue(res.userName)
          this.myForm.controls["userId"].setValue(res.userId)
          this.myForm.controls["isAdmin"].setValue(res.isAdmin)
        }
      })
  }

  public Save(callBack?: Function) {
    this.submitting = true
    if (!this.myForm.invalid) {
      (this.userId ? this.userService.update(this.myForm.value) :  this.userService.create(this.myForm.value))
        .then(res => {
          this.userService.get()
          this.notification.success("Saved Successfully")
          if(callBack){
            callBack()
          }else{
            this.router.navigate(["/managment/users"])
          }
          
        })
    }
    else {
      Object.keys(this.myForm.controls)
        .forEach(k => {
          this.myForm.controls[k].markAsDirty()
          this.myForm.controls[k].markAsTouched()
        })
    }
  }

  public SaveAndContinue(){
   this.Save(()=> {
     if(this.userId){
      this.load(this.myForm.controls["userName"].value)
     }else{
       this.router.navigate(["/managment/users/details/",this.myForm.controls["userName"].value])
     }
    
   })
  }
}
