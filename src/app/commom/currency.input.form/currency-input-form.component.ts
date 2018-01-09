import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormComponent, Property, FormConfig } from '../forms/my.form.component';
import { FormControl } from '@angular/forms/src/model';
import { Util } from '../util';
import { FormValidator } from '../validators/required-validator.directive';

@Component({
  selector: 'app-currency-input-form',
  templateUrl: './currency-input-form.component.html',
  styleUrls: ['./currency-input-form.component.scss']
})
export class CurrencyInputFormComponent implements FormComponent, OnInit {

    public currentValue: number = 0;
    public currentValueStr: string = "";
    public formControl: FormControl;
    
    @Input()
    public modelObject: Object;

    @Input()
    public formConfig: CurrencyInputFormConfig<any>;
    
    @ViewChild("myInput")
    public inputChild: any

    private currentValueChanged($event) {
        //this.currentValue = parseFloat(this.currentValueStr.replace(".", "").replace(",", "."))
        Util.setDeepValue(this.modelObject, this.currentValue, this.formConfig.modelProperty.name)
    }

    constructor() { }

    ngOnInit() {
        this.formControl = this.formConfig.createFormControl();
        this.currentValue = Util.truncate(Util.getDeepValue(this.modelObject, this.formConfig.modelProperty.name))
      //this.currentValueStr = this.currentValue.toString().replace(".", ",")
    }

    setSelectionEnd() {
      setTimeout(() => {
        this.inputChild.nativeElement.selectionStart = this.inputChild.nativeElement.value.length;
        this.inputChild.nativeElement.selectionEnd = this.inputChild.nativeElement.value.length;
      });
    }
}

export class CurrencyInputFormConfig<TModel> extends FormConfig<TModel> {
    componentType: any = CurrencyInputFormComponent

    constructor(
        public width: number,
        public modelProperty: Property<TModel>, 
        public validators: FormValidator[]
    ) {
        super(validators)
    }
  
}
