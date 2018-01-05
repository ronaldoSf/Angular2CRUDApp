import { FormValidator } from './../validators/required-validator.directive';
import { Property } from './../input.form/input.form.component';
import { Component, OnInit, Input, Inject, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Validator, FormGroup, ValidatorFn, FormControl } from '@angular/forms';

@Component({
  selector: 'app-my-form',
  templateUrl: './my.form.component.html',
  styleUrls: ['./my.form.component.scss']
})
export class MyFormComponent implements OnInit {

  @Input()
  public formConfigs: FormConfigRow<any>[]

  @Input()
  public modelObject: Object;

  @Input()
  public teste:string

  public formGroup: FormGroup
  public initiated: boolean = false

  ngOnInit() {
    console.log(this.teste) 
    this.initiated = true;
  }

  ngAfterContentInit() {
    console.log(this.teste)
  }

}

export class FormConfigRow<TModel> {
  formConfigs: FormConfig<TModel>[]
}

export abstract class FormConfig<TModel> {
    abstract componentType: any
    abstract modelProperty: Property<TModel>
    abstract validators: FormValidator[];
    public formControl: FormControl

    constructor(validators: FormValidator[]) {
        let validatorsFn = validators.map((validatorItem) => { return validatorItem.validator });
        this.formControl = new FormControl(this.modelProperty, validatorsFn)
    }

    /*public getFormControl(): FormControl {
        if (this.formControl == null) {
            let validators = this.validators.map((validatorItem) => { return validatorItem.validator });
            this.formControl = new FormControl(this.modelProperty, validators)
        }

        return this.formControl;
    }*/
}

@Component({
  selector: 'dynamic-form-holder',
  template: '<div></div>'
})
export class DynamicFormHolderComponent implements OnInit {

    private rootViewContainer;
    public createdComponent: FormComponent;

    @Input()
    public modelObject: Object;
  
    @Input()
    public formConfig: FormConfig<any>;

    constructor(@Inject(ViewContainerRef) viewContainerRef, @Inject(ComponentFactoryResolver) public factoryResolver) {
        this.rootViewContainer = viewContainerRef
    }

    addDynamicComponent(objectType: any) {
        const factory = this.factoryResolver.resolveComponentFactory(objectType)
        const component = factory.create(this.rootViewContainer.parentInjector)

        component.instance.formConfig = this.formConfig
        component.instance.modelObject = this.modelObject

        this.createdComponent = component;
        this.rootViewContainer.insert(component.hostView)
    }

    ngOnInit() {
        console.log(this.formConfig)        

        if (this.formConfig && this.modelObject) {
            this.addDynamicComponent(this.formConfig.componentType)          
        }
    }

}


export interface FormComponent {
    currentValue: any;  
    formConfig: FormConfig<any>;
    formControl: FormControl;
    modelObject: Object;
}
