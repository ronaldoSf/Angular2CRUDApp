import { Component, OnInit } from '@angular/core';
import { DialogConfig } from '../../commom/dialog/dialog.service';
import { EditComponent } from '../../commom/util';
import { FormConfigRow } from '../../commom/forms/my.form.component';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent extends EditComponent implements OnInit {


  constructor() { 
    super()
  }

  save() {
    throw new Error("Method not implemented.");
  }

  cancel() {
    throw new Error("Method not implemented.");
  }

  public windowTitle: string;
  public formConfigs: FormConfigRow<any>[];

  static dialogConfig: DialogConfig = {height: "auto", width: "400px"}
  
  ngOnInit() {
  }

}
