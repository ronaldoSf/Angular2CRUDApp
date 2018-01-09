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
  

  private currentValueChanged($event) {
      let newValue = !this.formConfig.modelPropertyIsId ? this.currentValue : this.currentValue[this.formConfig.idItemProperty.name]
      Util.setDeepValue(this.modelObject, newValue, this.formConfig.modelProperty.name)
  }

  constructor() { }

  ngOnInit() {
      this.formControl = this.formConfig.createFormControl();
      
      var newValue = null;

      if (!this.formConfig.modelPropertyIsId) {
          let selectedItem = Util.getDeepValue(this.modelObject, this.formConfig.modelProperty.name)
          let selectedItemValue = selectedItem[this.formConfig.idItemProperty.name]

          newValue = this.formConfig.itens.find((item) => {
            let itemId = item[this.formConfig.idItemProperty.name]
            let result = itemId == selectedItemValue 
            return result
          }) 
      } else {
          let selectedItemValue = Util.getDeepValue(this.modelObject, this.formConfig.modelProperty.name)

          newValue = this.formConfig.itens.find((item) => {
            let itemId = item[this.formConfig.idItemProperty.name]
            let result = itemId == selectedItemValue 
            return result
          }) 
      }

      this.currentValue = newValue
  }

}


export class ComboboxFormConfig<TModel, TItemModel> extends FormConfig<TModel> {
  componentType: any = ComboboxFormComponent

  constructor(
      public modelProperty: Property<TModel>, 
      public validators: FormValidator[], 
      public itens: TItemModel[], 
      public idItemProperty: Property<TItemModel>,
      public descItemProperty: Property<TItemModel>,
      public modelPropertyIsId: Boolean
    ) {
      super(validators)
  }
  
}

