import { Component, OnInit, Input } from '@angular/core';
import { FormComponent, FormConfig, Property } from '../forms/my.form.component';
import { FormControl } from '@angular/forms/src/model';
import { FormValidator } from '../validators/required-validator.directive';
import { Util } from '../util';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.scss']
})
export class CalendarFormComponent implements FormComponent, OnInit {

  constructor() { }

  public currentValue: string = "";
  public formControl: FormControl;
  
  @Input()
  public modelObject: Object;

  @Input()
  public formConfig: CalendarFormConfig<any>;
  

  private currentValueChanged($event) {
      Util.setDeepValue(this.modelObject, this.currentValue, this.formConfig.modelProperty.name)
  }

  ngOnInit() {
    this.formControl = this.formConfig.createFormControl();

    this.formControl.valueChanges.subscribe(
        (selectedValue) => {
            this.currentValue = selectedValue;
            this.currentValueChanged(null); 
        }
    );

    this.currentValue = Util.getDeepValue(this.modelObject, this.formConfig.modelProperty.name)
  }

}


export class CalendarFormConfig<TModel> extends FormConfig<TModel> {
  componentType: any = CalendarFormComponent

  constructor(public modelProperty: Property<TModel>, public validators: FormValidator[]) {
    super(validators)
  }
  
}

