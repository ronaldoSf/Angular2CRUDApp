import { Component, OnInit, Input } from '@angular/core';
import { FormComponent, Property, FormConfig } from '../forms/my.form.component';
import { FormControl } from '@angular/forms/src/model';
import { Util } from '../util';
import { FormValidator } from '../validators/required-validator.directive';
import { MaskedInputFormConfig } from '../masked.input.form/masked-input-form.component';
import { Validators } from '@angular/forms/src/validators';
import { Profile } from '../models';
import { Observable } from 'rxjs/Observable';
import { AutoComplete } from 'primeng/primeng';
import { AutoCompleteFormConfig, AutoCompleteFormComponent } from '../autocomplete.form/auto-complete-form.component';

@Component({
  selector: 'app-multiselect-form',
  templateUrl: './auto-complete-form.component.html',
  styleUrls: ['./auto-complete-form.component.scss']
})
export class MultiSelectFormComponent implements FormComponent, OnInit {

  @Input()
  public modelObject: Object;

  currentValue: any;
  formControl: FormControl;

  @Input()
  public formConfig: MultiSelectFormConfig<any, any>;

  //------------------------------------------------------
  public acFormConfig: AutoCompleteFormConfig<any, any>;
  public acModelObject: {label: string} = {label: ""};

  public acItens: any[]

  onAcModelChanged() {
    if (!Util.getDeepValue(this.modelObject, this.formConfig.modelProperty.name)) {
			  Util.setDeepValue(this.modelObject, [], this.formConfig.modelProperty.name)
		}

		if (this.acModelObject.label) {
      var modelProp = Util.getDeepValue(this.modelObject, this.formConfig.modelProperty.name)
      modelProp.push(this.acModelObject.label)
			this.acModelObject.label = null
			this.acFormConfig.component.currentValueStr = ""
		}
  }

  ngOnInit() {
      this.acFormConfig = new AutoCompleteFormConfig<any, any>(50, new Property("label"), [], this.acItens, this.formConfig.descItemProperty, this.formConfig.searchFunction, this.formConfig.idItemProperty, this.formConfig.placeHolder, this.onAcModelChanged.bind(this))
      super.ngOnInit()
  }

  getModelProperty() {
     return Util.getDeepValue(this.modelObject, this.formConfig.modelProperty.name)
  }

  getItemModelDescription(item) {
    return Util.getDeepValue(item, this.formConfig.descItemProperty.name)
  }

}

export class MultiSelectFormConfig<TModel, TItemModel> extends AutoCompleteFormConfig<TModel, TItemModel> {
  componentType: any = MultiSelectFormComponent

  
  constructor(
    public width: number,
    public modelProperty: Property<TModel>,
    public validators: FormValidator[], 
    public itens: TItemModel[], 
    public descItemProperty: Property<TItemModel>,
    public searchFunction: Function,
    public idItemProperty: Property<TItemModel> = null,
    public placeHolder: string = "",
    public onModelChanged: Function = null,
  ) {
    super(width, modelProperty, validators, itens, descItemProperty, searchFunction, idItemProperty, placeHolder, onModelChanged)
  }

}