import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
 public dataSource: User[] = []
  constructor(private userService: UserService,public auth: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.userService.get()
    .then(res=> this.dataSource = res);
  }

  public addNew() {
    this.router.navigate(['/managment/users/register'])
   }
 
}
