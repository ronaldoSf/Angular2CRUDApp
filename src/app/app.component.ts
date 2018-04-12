import {Component} from '@angular/core';
import {MenuItem, Config} from './commom/config';
import {PERMISSIONS} from './commom/permissions';
import {UserService} from './user/user.service';
import { Title } from '@angular/platform-browser';
import { AuthGuard } from './guard.auth';
import { User } from './commom/models';

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

  get isAdmin(): boolean {
    return AuthGuard.isAdmin()
  }

  headerText: string = Config.appName.toUpperCase()
  menus: MenuItem[] = Config.allMenus

  ngOnInit() {
    console.log(localStorage.getItem('loginData') != null)
  }

  get userNameLogged(): string {
    var loginDataStr = localStorage.getItem('loginData')
    return loginDataStr == null ? "" : (JSON.parse(loginDataStr) as {user: User}).user.name.toString()
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
