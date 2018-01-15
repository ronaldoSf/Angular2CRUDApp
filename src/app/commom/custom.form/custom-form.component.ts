import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormValidator } from '../validators/required-validator.directive';
import { FormComponent, Property, FormConfig } from '../forms/my.form.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss']
})
export class CustomFormComponent implements FormComponent {
    
    //NOT USED
    currentValue: any;
    formControl: FormControl;
    modelObject: Object;

    //USED
    formConfig: CustomFormConfig<any>;
    templateRef: TemplateRef<any>


    ngOnInit() {
        this.formControl = this.formConfig.createFormControl()
        this.templateRef = this.formConfig.templateRefFunction()
    }

}

export class CustomFormConfig<T> extends FormConfig<T> {
    componentType: any = CustomFormComponent
    public placeHolder: string = ""
    public modelProperty: Property<T> = null;

    constructor(
        public width: number,
        public validators: FormValidator[],
        public templateRefFunction: Function) {
        super(validators)
    }
  
}