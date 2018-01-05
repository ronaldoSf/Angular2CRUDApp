import { FormValidator } from './../validators/required-validator.directive';
import { Util } from './../util';
import { Component, OnInit, Input } from '@angular/core';
import { FormConfig, FormComponent } from '../forms/my.form.component';
import { FormControl, Validator, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-input.form',
  templateUrl: './input.form.component.html',
  styleUrls: ['./input.form.component.scss']
})
export class InputFormComponent implements FormComponent, OnInit {

    public currentValue: string = "";
    public formControl: FormControl;
    
    @Input()
    public modelObject: Object;

    @Input()
    public formConfig: InputFormConfig<any>;
    

    private currentValueChanged($event) {
        Util.setDeepValue(this.modelObject, this.currentValue, this.formConfig.modelProperty.name)
    }

    constructor() { }

    ngOnInit() {
        this.formControl = this.formConfig.formControl;
        this.currentValue = Util.getDeepValue(this.modelObject, this.formConfig.modelProperty.name)
    }

}

export class InputFormConfig<TModel> extends FormConfig<TModel> {
    componentType: any = InputFormComponent

    constructor(public modelProperty: Property<TModel>, public validators: FormValidator[]) {
      super(validators)
    }
    
}



export class Property<T> {
  
    public name: string;
  
    constructor(name: keyof T) {
      this.name = name;
    }
}