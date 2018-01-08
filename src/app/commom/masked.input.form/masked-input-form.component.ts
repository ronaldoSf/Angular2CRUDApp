import { Component, OnInit, Input } from '@angular/core';
import { InputFormComponent } from '../input.form/input.form.component';
import { FormConfig, Property, FormComponent } from '../forms/my.form.component';
import { FormValidator } from '../validators/required-validator.directive';
import { FormControl } from '@angular/forms';
import { Util } from '../util';

@Component({
  selector: 'app-masked-input-form',
  templateUrl: './masked-input-form.component.html',
  styleUrls: ['./masked-input-form.component.scss']
})
export class MaskedInputFormComponent implements FormComponent, OnInit {


  public currentValue: string = "";
  public formControl: FormControl;
  
  @Input()
  public modelObject: Object;

  @Input()
  public formConfig: MaskedInputFormConfig<any>;
  

  private currentValueChanged($event) {
      Util.setDeepValue(this.modelObject, this.currentValue, this.formConfig.modelProperty.name)
  }

  constructor() { }

  ngOnInit() {
      this.formControl = this.formConfig.createFormControl();
      this.currentValue = Util.getDeepValue(this.modelObject, this.formConfig.modelProperty.name)
  }

}

export class MaskedInputFormConfig<TModel> extends FormConfig<TModel> {
  componentType: any = MaskedInputFormComponent

  constructor(public modelProperty: Property<TModel>, public validators: FormValidator[], public mask: string) {
    super(validators)
  }
  
}
