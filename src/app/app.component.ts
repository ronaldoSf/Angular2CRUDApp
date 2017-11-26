import { Component } from '@angular/core';
import {MenuItem} from 'primeng/primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  menus: MenuItem[] = [
    {
        label: 'Administrador',
        icon: 'home',
        items: [
          {label: 'Usuário', icon: 'home'},
          {label: 'Perfis de usuário', icon: 'home'}
        ]
    },
    {
        label: 'Financeiro',
        icon: 'home',
        items: [
            {label: 'Contas a pagar', icon: 'home'},
            {label: 'Contas a receber', icon: 'home'}
        ]
    },
    {
        label: 'Financeiro',
        icon: 'home',
        items: [
            {label: 'Contas a pagar', icon: 'home'},
            {label: 'Contas a receber', icon: 'home'}
        ]
    },
    {
        label: 'Financeiro',
        icon: 'home',
        items: [
            {label: 'Contas a pagar', icon: 'home'},
            {label: 'Contas a receber', icon: 'home'}
        ]
    },
    {
        label: 'Financeiro',
        icon: 'home',
        items: [
            {label: 'Contas a pagar', icon: 'home'},
            {label: 'Contas a receber', icon: 'home'}
        ]
    }
  ];


}
