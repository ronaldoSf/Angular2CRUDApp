import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormComponent, FormConfig, Property } from '../forms/my.form.component';
import { FormControl } from '@angular/forms/src/model';
import { FormValidator } from '../validators/required-validator.directive';
import { Util } from '../util';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarFormComponent implements FormComponent, OnInit {

    constructor() { }

    public currentValue: Date = null;
    private currentValueStr: string = ""
    public formControl: FormControl;
    private isCalendarShowing: Boolean = false
    
    @Input()
    public modelObject: Object;

    @Input()
    public formConfig: CalendarFormConfig<any>;

    brLocale = {
        firstDayOfWeek: 0,
        monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
		monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun', 'Jul','Ago','Set','Out','Nov','Dez'],
		dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
		dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
		dayNamesMin: ['D','S','T','Q','Q','S','S'],
        today: 'Hoje',
        clear: 'Limpar'
    };
    
    /*
    private get currentValueStr(): string {
        return moment(this.currentValue).format("DD/MM/YYYY")
    }*/

    private currentValueChanged($event) {
        let momentDate = moment(this.currentValue);
        this.currentValueStr = this.currentValue == null ? this.currentValueStr : momentDate.format("DD/MM/YYYY")
        Util.setDeepValue(this.modelObject, this.currentValue, this.formConfig.modelProperty.name)
    }

    private currentInputValueChanged($event) {
        let momentDate = moment(this.currentValueStr, "DD/MM/YYYY", true);
        this.currentValue = !momentDate.isValid() ? null : momentDate.toDate()
        Util.setDeepValue(this.modelObject, this.currentValue, this.formConfig.modelProperty.name)
    }

    private inputfocusIn() {
        this.isCalendarShowing = true
    }

    private inputfocusOut() {
        this.isCalendarShowing = false
        //setTimeout(() => { 
        //    this.isCalendarShowing = false            
        //}, 400)
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

    constructor(
        public modelProperty: Property<TModel>, 
        public validators: FormValidator[],
        public improvedNavigation: Boolean = false
    ) {
        super(validators)
    }
  
}

