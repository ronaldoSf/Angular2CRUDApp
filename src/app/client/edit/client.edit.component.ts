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
import { ClientService } from '../client.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client, Company, Profile } from '../../commom/models';
import { CustomFormConfig } from '../../commom/custom.form/custom-form.component';
import { ViewChild } from '@angular/core';

@Component({
	selector: 'app-edit.client',
	templateUrl: './client.edit.component.html',
	styleUrls: ['./client.edit.component.scss'],
	providers: [ ClientService, DialogService ],	
})
export class ClientEditComponent extends EditComponent implements OnInit {

	constructor(public dialogRef: MatDialogRef<ClientEditComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogService: DialogService, 
		public clientService: ClientService
	) {
		super();

		if (data.entity) {
			this.client = data.entity;
		}
	}
	
	@ViewChild('imageUploaderTemplateRef') 
	public imageUploaderTemplate: TemplateRef<any>;
		
	@ViewChild('clientInfsTemplateRef') 
	public clientInfsTemplate: TemplateRef<any>;
	
	static dialogConfig: DialogConfig = {height: "auto", width: "400px"}

	public client: Client = new Client()

	public empresas: Company[] = [new Company(1, "Umaa"), new Company(2, "Duaaas"), new Company(3, "Treees"), new Company(4, "Quaaatro")]
	public perfis: Profile[] = [new Profile(1, "Umaa"), new Profile(2, "Duaaas"), new Profile(3, "Treees"), new Profile(4, "Quaaatro")]
	
	private clientInfsTypes = [
		{label: "Telefone", key: "PHONE"},
		{label: "Facebook", key: "FACEBOOK"},
		{label: "Website" , key: "WEBSITE"},
		{label: "Endereço", key: "ADDRESS"},
	]

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
			this.clientService.save({model: this.client}).subscribe(
				(result) => { 
					this.client.id = result.id
					this.matDialogRef.close()
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
		return this.client.id > 0 ? "Editar cliente" : "Novo cliente";
	}

	public formConfigs: FormConfigRow<Client>[] = [
		{
			formConfigs: [
				new InputFormConfig(200, new Property("name"), [], false, "Nome"),
				new InputFormConfig(0, new Property("cnpj"), [new RequiredValidator()], false, "CNPJ"),
			]
		}, {
			formConfigs: [
				new CustomFormConfig(0, [], () => this.clientInfsTemplate)
				//new InputFormConfig(0, new Property("newPassword"), [new RequiredValidator()], true, "Nova Senha")
			]
		}, {
			formConfigs: [
				new CustomFormConfig(0, [], () => this.imageUploaderTemplate)
				//new ComboboxFormConfig<Client, Company>(0, new Property("companyId"), [new RequiredValidator()], this.empresas, new Property("id"), new Property("name"), true, "Empresa..."),
				//new ComboboxFormConfig<Client, Profile>(0, new Property("profileId"), [], this.perfis, new Property("id"), new Property("name"), true, "Perfil..."),
			]
		}
	]

	getPerfisByName(valueStr: String): Observable<Client> {
			return Observable.create(observer => {
					let newItens = [new Profile(1, "Umaa"), new Profile(2, "Duaaas"), new Profile(4, "Quaaatro")]
					observer.next(newItens);
					observer.complete();
			});
	}
	
	ngOnInit() {
	}

}

