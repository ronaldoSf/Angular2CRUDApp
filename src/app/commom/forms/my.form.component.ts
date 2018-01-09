import { FormValidator } from './../validators/required-validator.directive';
import { Component, OnInit, Input, Inject, ComponentFactoryResolver, ViewContainerRef, Output, EventEmitter } from '@angular/core';
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

    @Output()
    public saveEvent: EventEmitter<void> = new EventEmitter()

    @Output()
    public cancelEvent: EventEmitter<void> = new EventEmitter()

    public save() {
        this.saveEvent.emit()        
    }

    public cancel() {
        this.cancelEvent.emit()
    }


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

export abstract class FormConfig<TModel> extends FormConfigRow<TModel> {
    abstract componentType: any
    abstract modelProperty: Property<TModel>
    abstract validators: FormValidator[];
    public formControl: FormControl
    public isDisabled: Boolean = false
    public placeholder: string = ""
    abstract width: number; //0 é

    public formConfigs: FormConfig<TModel>[] = [this]

    
    constructor(validators: FormValidator[]) {
        super()
        //this.createFormControl(validators)
    }

    public setPlaceHolder(placeholder: string): FormConfig<TModel> {
        this.placeholder = placeholder
        return this;
    }
    
    public setWidth(width: number): FormConfig<TModel> {
        this.width = width
        return this;        
    }

    public createFormControl(validators: FormValidator[] = this.validators): FormControl {
        if (this.formControl == null) {
            let validatorsFn = validators.map((validatorItem) => { return validatorItem.validator });
            this.formControl = new FormControl(null, validatorsFn)
        }

        return this.formControl;
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
        try {
            const factory = this.factoryResolver.resolveComponentFactory(objectType)
            const component = factory.create(this.rootViewContainer.parentInjector)
    
            component.instance.formConfig = this.formConfig
            component.instance.modelObject = this.modelObject
    
            this.createdComponent = component;
            this.rootViewContainer.insert(component.hostView)
        } catch (error) {
            alert("Um item não pode ser carregado: " + objectType.name)
        }
        
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



export class Property<T> {
    
      public name: string;
    
      constructor(name: keyof T) {
        this.name = name;
      }
  }