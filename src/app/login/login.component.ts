import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public userService: UserService) { }

  userName = "";
  password = "";

  onClickLogin() {
	/*this.userService.login({login: this.userName, password: this.password})
	.subscribe((result) => {
		if (result.status == "OK" && result.result.hash) {
			localStorage.setItem('loginHash', result.result.hash);
			localStorage.setItem('loginName', result.result.user.name.toString());
		} else {
			alert("Erro desonhecido")
		}
	}, (error) => {
		alert(error)
	})*/

	localStorage.setItem('loginData', JSON.stringify({hash: "", user: {}}));

	window.location.reload();
  }

  ngOnInit() {
  }

}
