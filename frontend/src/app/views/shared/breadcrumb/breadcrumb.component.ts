import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs/operators';

export interface IBreadCrumb{
  label: string,
   url: string,
   isActive?: boolean
   isText?: boolean
}
@Component({
  selector: 'app-core-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  public breadcrumbs: IBreadCrumb[]
  constructor( private router: Router){
    
  }

  ngOnInit(): void {
    this.breadcrumbs =  this.buildBreadCrumb(this.router.url)
   
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.breadcrumbs = this.buildBreadCrumb(this.router.url);
    })
  }

  buildBreadCrumb(url: string = ''): IBreadCrumb[] {
   const list: IBreadCrumb[] = []
   list.push({
     label: 'Home',
     url: '/'
   })

   const links = url.split("/").filter(url=> !!url)
   if(links.findIndex(l=> l.toLowerCase() == 'connections') > -1){
     list.push({
       label: 'Connections',
       url: '',
       isText: true
     })
     
     let index = 0;
     const resources =  links.filter(l=> l.toLowerCase() !== 'connections')
     let url = `/connections/`
     resources
     .filter(l=> l.toLowerCase() != 'all')
     .forEach(l=> {
       if(resources.length -1 == index){
        list.push({
          label: l,
          url: "",
          isActive: true
        })
       }else{
         url = `${url}/${l}`
        list.push({
          label: l,
          url: url,
        })
       }
      index++
     })
   }else{
     
   }

   return list
  }

}
