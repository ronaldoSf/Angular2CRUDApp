import { InputFormConfig, Property } from './../../commom/input.form/input.form.component';
import { RequiredValidator } from './../../commom/validators/required-validator.directive';
import { Validators } from '@angular/forms';
import { FormConfigRow, FormConfig } from './../../commom/forms/my.form.component';
import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogConfig } from '../../commom/dialog/dialog.service';
import { Usuario } from '../../commom/models';
import { Util } from '../../commom/util';

@Component({
  selector: 'app-edit.user',
  templateUrl: './edit.user.component.html',
  styleUrls: ['./edit.user.component.scss']
})
export class UserEditComponent extends DialogComponent implements OnInit {

  static dialogConfig:DialogConfig = {height: "auto", width: "200px"}

  public usuario: Usuario = {codigo: 1, nome: "a", login: "s", senha: "d", perfilCod: 1, empresaCod: 1, perfilNome: "", empresaNome: ""}

  public formConfigs: FormConfigRow<Usuario>[] = [
    {
        formConfigs: [
            new InputFormConfig(new Property("nome"), [new RequiredValidator()])
        ]
    }
  ]
  
  ngOnInit() {
  }

}

