import { Component } from '@angular/core';
import {MenuItem} from 'primeng/primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  menu: MenuItem[] = [
    {
        label: 'Administrador',
        items: [
          {label: 'Usuário', icon: 'fa-mail-forward'},
          {label: 'Perfis de usuário', icon: 'fa-mail-forward'}
        ]
    },
    {
        label: 'Financeiro',
        icon: 'fa-edit',
        items: [
            {label: 'Contas a pagar', icon: 'fa-mail-forward'},
            {label: 'Contas a receber', icon: 'fa-mail-reply'}
        ]
    }
  ];


}
