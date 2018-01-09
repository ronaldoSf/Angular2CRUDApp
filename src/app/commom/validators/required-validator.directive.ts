import { Validator, AbstractControl, ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';
import { Directive } from '@angular/core';


export class RequiredValidator implements FormValidator {

    messages: {main: string} = {main: "Campo obrigatório"};
    
    validator = (c: any): ValidationErrors => {
        return this.doValidate(c)
    }

    doValidate(formControl: FormControl): ValidationErrors {
        let value = formControl.value as string;

        /*if (!formControl.touched) {
            return null;
        }*/
        if (value == null) {
            return {0: this.messages.main}            
        } else if (typeof value === "string" && value.trim() == "") {
            return {0: this.messages.main}
        } else {
            return null;
        }
    }

}


export interface FormValidator {
    validator: ValidatorFn
    messages: {}
    conditions?: BooleanFunction[]
}

export interface BooleanFunction {
    () : Boolean
}

/*export class SimpleValidators {

    public static readonly required: FormValidator = {
        messages: [],
        validator: (value: any): ValidationErrors => {
            if (value == null || value.trim() == "") {
                return {message: "Campo obrigatório"}
            } else {
                return null;
            }
        }
    }

} */

/*
class SimpleValidator implements FormValidator {
    validator: ValidatorFn;
    messages: {} = {}
}*/