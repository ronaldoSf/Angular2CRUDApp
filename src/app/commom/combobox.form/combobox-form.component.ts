import { Component, OnInit, Input } from '@angular/core';
import { FormComponent, Property, FormConfig } from '../forms/my.form.component';
import { FormControl } from '@angular/forms/src/model';
import { InputFormConfig } from '../input.form/input.form.component';
import { Util } from '../util';
import { FormValidator } from '../validators/required-validator.directive';

@Component({
  selector: 'app-combobox-form',
  templateUrl: './combobox-form.component.html',
  styleUrls: ['./combobox-form.component.scss']
})
export class ComboboxFormComponent implements FormComponent, OnInit {

    
    public currentValue: any = null;
    public formControl: FormControl;
    
    @Input()
    public modelObject: Object;

    @Input()
    public formConfig: ComboboxFormConfig<any, any>;

    public nullItem: Object = {}

    public currentValueChanged($event) {
        this.updateModelValue();
    }

    constructor() { }

    ngOnInit() {
        this.formConfig.component = this;

        this.formControl = this.formConfig.createFormControl();
        this.formControl.setValue(Util.getDeepValue(this.modelObject, this.formConfig.modelProperty.name))
        
        this.nullItem[this.formConfig.idItemProperty.name] = 0;
        this.nullItem[this.formConfig.descItemProperty.name] = this.formConfig.placeHolder;
      
        this.updateCurrentValue();
    }

    updateModelValue(maskAsDirty = true) {
        var newValue = null;
        
        if (this.currentValue == null || this.currentValue == this.nullItem) {
            newValue = null
        } else {
            newValue = !this.formConfig.modelPropertyIsId ? this.currentValue : this.currentValue[this.formConfig.idItemProperty.name]        
        }

        if (maskAsDirty) {
            this.formControl.markAsDirty()
        }

        this.formControl.setValue(newValue)
        Util.setDeepValue(this.modelObject, newValue, this.formConfig.modelProperty.name)

        if (this.formConfig.onChanged) {
            this.formConfig.onChanged(newValue)
        }
    }

    updateCurrentValue() {
        
        var newValue = null;
        
        if (!this.formConfig.modelPropertyIsId) {
            let selectedItem = Util.getDeepValue(this.modelObject, this.formConfig.modelProperty.name)

            if (selectedItem == null) {
                newValue = this.nullItem
            } else {
                let selectedItemValue = selectedItem[this.formConfig.idItemProperty.name]
            
                newValue = this.formConfig.itens.find((item) => {
                    let itemId = item[this.formConfig.idItemProperty.name]
                    let result = itemId == selectedItemValue 
                    return result
                })
            }
        } else {
            let selectedItemValue = Util.getDeepValue(this.modelObject, this.formConfig.modelProperty.name)

            if (selectedItemValue == null) {
                newValue = this.nullItem
            } else {
                newValue = this.formConfig.itens.find((item) => {
                    let itemId = item[this.formConfig.idItemProperty.name]
                    let result = itemId == selectedItemValue 
                    return result
                })
            }

            console.log(
                " modelProperty: " + this.formConfig.modelProperty.name +
                " idItemProperty: " + this.formConfig.idItemProperty.name + 
                " selectedItemValue: " + selectedItemValue + 
                " newValue: " + newValue
            )
        }

        this.currentValue = newValue
    }

}


export class ComboboxFormConfig<TModel, TItemModel> extends FormConfig<TModel> {
  componentType: any = ComboboxFormComponent

  constructor(
    public width: number,
    public modelProperty: Property<TModel>, 
      public validators: FormValidator[], 
      public itens: TItemModel[], 
      public idItemProperty: Property<TItemModel>,
      public descItemProperty: Property<TItemModel>,
      public modelPropertyIsId: Boolean,
      public placeHolder: string = "Selecione...",
      public onChanged?: Function,
    ) {
      super(validators)
  }
  
  public component?: ComboboxFormComponent;
}

