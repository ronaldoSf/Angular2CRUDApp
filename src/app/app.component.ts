import {Component} from '@angular/core';
import {MenuItem, Config} from './commom/config';
import {PERMISSIONS} from './commom/permissions';
import {UserService} from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ UserService ],  
})
export class AppComponent {

  constructor(private userService: UserService) {}
  
  menus: MenuItem[] = Config.allMenus

  ngOnInit() {
    this.userService.login({ login: "", password: ""}).subscribe(
      result => {},
      error => { 
        //alert(error) 
      }
    )
  }

  sidenavOpened = true

  onSidenavClosed() {
    this.sidenavOpened = false
    //alert("clo")
  }


  onSidenavOpened() {
    this.sidenavOpened = true
    //alert("clo")   
  }
            
}
