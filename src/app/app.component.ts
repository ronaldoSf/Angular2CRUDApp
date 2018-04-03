import {Component} from '@angular/core';
import {MenuItem, Config} from './commom/config';
import {PERMISSIONS} from './commom/permissions';
import {UserService} from './user/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ UserService ],  
})
export class AppComponent {

  constructor(private userService: UserService, private titleService: Title) {
      this.titleService.setTitle(Config.appName)
  }

  headerText: string = Config.appName.toUpperCase()
  menus: MenuItem[] = Config.allMenus

  ngOnInit() {
    console.log(localStorage.getItem('loginData') != null)
  }

  sidenavOpened = true
  logged = localStorage.getItem('loginData') != null

  onSidenavClosed() {
    this.sidenavOpened = false
    //alert("clo")
  }

  logoff() {
	localStorage.removeItem('loginData')
	window.location.reload();
  }

  onSidenavOpened() {
    this.sidenavOpened = true
    //alert("clo")   
  }

  toogleSidenav() {
    this.sidenavOpened = !this.sidenavOpened
  }
            
}
