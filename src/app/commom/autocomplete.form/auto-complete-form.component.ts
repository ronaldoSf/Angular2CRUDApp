import { Component, OnInit, Input } from '@angular/core';
import { FormComponent, Property, FormConfig } from '../forms/my.form.component';
import { FormControl } from '@angular/forms/src/model';
import { Util } from '../util';
import { FormValidator } from '../validators/required-validator.directive';
import { MaskedInputFormConfig } from '../masked.input.form/masked-input-form.component';
import { ListFormConfig } from '../list.form/list-form.component';
import { Validators } from '@angular/forms/src/validators';
import { Perfil } from '../models';
import { Observable } from 'rxjs/Observable';
import { AutoComplete } from 'primeng/primeng';

@Component({
  selector: 'app-auto-complete-form',
  templateUrl: './auto-complete-form.component.html',
  styleUrls: ['./auto-complete-form.component.scss']
})
export class AutoCompleteFormComponent implements FormComponent, OnInit {

  public isValid: Boolean = false
  public currentValueStr: string = "";
  public currentValue: any = null;
  public formControl: FormControl;

  public itensStr: string[] = []
  
  @Input()
  public modelObject: Object;

  @Input()
  public formConfig: AutoCompleteFormConfig<any, any>;

  private loadData() {
    if (this.formConfig.searchFunction) {
      let observable: Observable<any[]> = this.formConfig.searchFunction(this.currentValueStr)

      observable.subscribe(
            result => {
                this.formConfig.itens = result

                this.itensStr = this.formConfig.itens.map<string>((item) => { 
                    let retorno = item[this.formConfig.descItemProperty.name] 
                    return retorno
                })

                this.currentValueStrChanged();
            },
            error => { 
                //this.showError(error)
            }
        )
    }
  }

  public search($event) {
      /*this.formConfig.itens = [new Perfil(1, "Umaa"), new Perfil(2, "Duaaas"), new Perfil(4, "Quaaatro")]
      this.itensStr = this.formConfig.itens.map<string>((item) => { 
        let retorno = item[this.formConfig.descItemProperty.name] 
        return retorno
      })*/
  }
  
  private currentValueStrChanged() {
      this.currentValue = this.formConfig.itens.find((item) => { return item[this.formConfig.descItemProperty.name] == this.currentValueStr })
      Util.setDeepValue(this.modelObject, this.currentValue, this.formConfig.modelProperty.name)
  }

  constructor() { }

  ngOnInit() {
      this.formControl = this.formConfig.createFormControl();
      this.currentValue = Util.getDeepValue(this.modelObject, this.formConfig.modelProperty.name)
      this.currentValueStr = this.currentValue[this.formConfig.descItemProperty.name]
      this.itensStr = this.formConfig.itens.map<string>((item) => { 
        let retorno = item[this.formConfig.descItemProperty.name] 
        return retorno
      })
  }

}

export class AutoCompleteFormConfig<TModel, TItemModel> extends FormConfig<TModel> {
  componentType: any = AutoCompleteFormComponent

  
  constructor(
    public modelProperty: Property<TModel>,
    public validators: FormValidator[], 
    public itens: TItemModel[], 
    public descItemProperty: Property<TItemModel>,
    public searchFunction: Function,
    public idItemProperty: Property<TItemModel> = null    
  ) {
    //super(modelProperty, validators, itens, idItemProperty, descItemProperty, modelPropertyIsId)
    super(validators)
  }

}

AutoComplete.prototype.isDropdownClick = function (event) {
    var target = event.target;
    return this.dropdownButton != null && (target === this.dropdownButton.nativeElement || target.parentNode === this.dropdownButton.nativeElement);
};