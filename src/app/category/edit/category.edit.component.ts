import { InputFormConfig } from './../../commom/input.form/input.form.component';
import { RequiredValidator } from './../../commom/validators/required-validator.directive';
import { Validators } from '@angular/forms';
import { FormConfigRow, FormConfig, Property } from './../../commom/forms/my.form.component';
import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { DialogComponent, DialogConfig, DialogService } from '../../commom/dialog/dialog.service';
import { Util, EditComponent } from '../../commom/util';
import { CalendarFormComponent, CalendarFormConfig } from '../../commom/calendar.form/calendar-form.component';
import { MaskedInputFormComponent, MaskedInputFormConfig } from '../../commom/masked.input.form/masked-input-form.component';
import { ComboboxFormConfig } from '../../commom/combobox.form/combobox-form.component';
import { CurrencyInputFormConfig } from '../../commom/currency.input.form/currency-input-form.component';
import { AutoCompleteFormConfig } from '../../commom/autocomplete.form/auto-complete-form.component';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from '../category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category, Company, Profile } from '../../commom/models';
import { CustomFormConfig } from '../../commom/custom.form/custom-form.component';
import { ViewChild } from '@angular/core';
import { FileHolder, ImageUploadComponent } from 'angular2-image-upload/lib/image-upload/image-upload.component';

@Component({
	selector: 'app-edit.category',
	templateUrl: './category.edit.component.html',
	styleUrls: ['./category.edit.component.scss'],
	providers: [ CategoryService, DialogService ],	
})
export class CategoryEditComponent extends EditComponent implements OnInit {

	constructor(public dialogRef: MatDialogRef<CategoryEditComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogService: DialogService, 
		public categoryService: CategoryService
	) {
		super();

		if (data.entity) {
			this.category = data.entity;
		}

	}

	
	static dialogConfig: DialogConfig = {height: "auto", width: "600px"}

	public category: Category = new Category()

	public empresas: Company[] = [new Company(1, "Umaa"), new Company(2, "Duaaas"), new Company(3, "Treees"), new Company(4, "Quaaatro")]
	public perfis: Profile[] = [new Profile(1, "Umaa"), new Profile(2, "Duaaas"), new Profile(3, "Treees"), new Profile(4, "Quaaatro")]
	
	public save() {
		let strErrors: string[] = []

		this.formConfigs.forEach((row) => {
			row.formConfigs.forEach((item) => {
				item.createFormControl().markAsDirty()
				let formErrors = item.createFormControl().errors
				let formName: string = item.placeHolder.replace(".", "");

				if (formErrors) {
					Util.objToArray(formErrors).forEach((error) => {
						strErrors.push(formName + ": " + error + "")         
					})
				}
				
			})
		})


		if (strErrors.length > 0 ) {
			this.dialogService.createDialogMessage(strErrors.join(" <br/> "));			
		} else {
			this.categoryService.save({model: this.category}).subscribe(
				(result) => { 
                    if (result.status == "OK") {
                        this.category.id = result.id
                        this.matDialogRef.close()
                    } else {
                        alert("Erro: " + result.cause)
                    }
				},
				(error) => { 
					this.dialogService.createDialogMessage("Erro ao salvar") 
				},
			)
		}

	}

	public cancel() {
		this.matDialogRef.close()
	}


	get windowTitle(): string {
		return this.category.id > 0 ? "Editar categorye" : "Novo categorye";
	}

	public formConfigs: FormConfigRow<Category>[] = [
		{
			formConfigs: [
				new InputFormConfig(200, new Property("name"), [new RequiredValidator()], false, "Nome"),
			]
		}
	]

	getPerfisByName(valueStr: String): Observable<Category> {
			return Observable.create(observer => {
					let newItens = [new Profile(1, "Umaa"), new Profile(2, "Duaaas"), new Profile(4, "Quaaatro")]
					observer.next(newItens);
					observer.complete();
			});
	}
	
	ngOnInit() {
	}

}

