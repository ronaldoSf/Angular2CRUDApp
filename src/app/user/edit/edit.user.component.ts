import { InputFormConfig } from './../../commom/input.form/input.form.component';
import { RequiredValidator } from './../../commom/validators/required-validator.directive';
import { Validators } from '@angular/forms';
import { FormConfigRow, FormConfig, Property } from './../../commom/forms/my.form.component';
import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { DialogComponent, DialogConfig, DialogService } from '../../commom/dialog/dialog.service';
import { Util, EditComponent } from '../../commom/util';
import { CalendarFormComponent, CalendarFormConfig } from '../../commom/calendar.form/calendar-form.component';
import { MaskedInputFormComponent, MaskedInputFormConfig } from '../../commom/masked.input.form/masked-input-form.component';
import { ComboboxFormConfig } from '../../commom/combobox.form/combobox-form.component';
import { CurrencyInputFormConfig } from '../../commom/currency.input.form/currency-input-form.component';
import { AutoCompleteFormConfig } from '../../commom/autocomplete.form/auto-complete-form.component';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User, Company, Profile, UserRoles, UserRole, City } from '../../commom/models';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { CustomFormConfig } from '../../commom/custom.form/custom-form.component';
import { ClientService } from '../../client/client.service';
import 'rxjs/add/operator/map'

@Component({
	selector: 'app-edit.user',
	templateUrl: './edit.user.component.html',
	styleUrls: ['./edit.user.component.scss'],
	providers: [ ClientService, UserService, DialogService ],	
})
export class UserEditComponent extends EditComponent implements OnInit {

	constructor(public dialogRef: MatDialogRef<UserEditComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogService: DialogService, 
		public userService: UserService, 
		public clientService: ClientService,
	) {
		super();

		if (data.entity) {
			this.usuario = data.entity;
			
			this.usuario.citiesAllowed.forEach(item => this.allCities[item.name.toString()] = item)
			this.citiesStrSelected = this.usuario.citiesAllowed.map(cat => cat.name.toString())
		}

		this.passwordConfig.validators = this.usuario.id > 0 ? [] : [new RequiredValidator()]
		this.newPasswordConfig.validators = this.usuario.id > 0 ? [] : [new RequiredValidator()]
	}

	static dialogConfig: DialogConfig = {height: "auto", width: "400px"}

	public usuario: User = new User()

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
			this.userService.save({model: this.usuario}).subscribe(
				(result) => { 
					this.usuario.id = result.id
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
		return this.usuario.id > 0 ? "Editar usuário" : "Novo usuário";
	}


	searchCities() {

		
		/*this.clientService.getCitiesByName({name: this.usuario.citySearch.toString()})
		.map((result) => result.result)
		.subscribe(
            result => {
                this.autoCompleteFormConfig.itens = result.result
            },
            error => {
                //this.showError(error)
            }
		)
*/
	}


	@ViewChild('citiesTemplateRef') 
	public citiesTemplate: TemplateRef<any>;

	passwordConfig = new InputFormConfig<User>(160, new Property("password"), [], true, "Nova Senha")
	newPasswordConfig = new InputFormConfig<User>(0, new Property("newPassword"), [], true, "Repita a Nova Senha")

	public formConfigs: FormConfigRow<User>[] = [
		{
			formConfigs: [
				new InputFormConfig(200, new Property("name"), [], false, "Nome"),
				new InputFormConfig(0, new Property("login"), [new RequiredValidator()], false, "Login"),
			]
		}, {
			formConfigs: [
				this.passwordConfig,
				this.newPasswordConfig,
			]
		}, {
			formConfigs: [
				new ComboboxFormConfig<User, UserRole>(0, new Property("role"), [new RequiredValidator()], Util.objToArray(UserRoles), new Property("value"), new Property("desc"), true, "Papel..."),
				//new ComboboxFormConfig<User, Profile>(0, new Property("profileId"), [], this.perfis, new Property("id"), new Property("name"), true, "Perfil..."),
			]
		}, {
			formConfigs: [
				new CustomFormConfig(200, [], () => this.citiesTemplate),
			]
		}
	]

	

	getPerfisByName(valueStr: String): Observable<User> {
			return Observable.create(observer => {
					let newItens = [new Profile(1, "Umaa"), new Profile(2, "Duaaas"), new Profile(4, "Quaaatro")]
					observer.next(newItens);
					observer.complete();
			});
	}
	
	ngOnInit() {
	}

	_citiesStrSelected: string[]
	_citiesStr: string[]
	allCities: Object = {}
	
    set citiesStrSelected(itens: string[])  {
		this._citiesStrSelected = itens
		this.usuario.citiesAllowed = itens.map(item => this.allCities[item])
	}
	
    get citiesStrSelected(): string[] {
		return this._citiesStrSelected
	}

    set citiesStr(itens: string[])  {
		this._citiesStr = itens
	}
	
    get citiesStr(): string[] {
		return this._citiesStr;
	}

	searchCitiesByName(event) {
		this.clientService.getCitiesByName({name: event.query})
		.subscribe(result => {
			//this.citiesFormConfig.component.setItens(result.result.items)
			result.result.forEach(item => this.allCities[item.name.toString()] = item)
			this.citiesStr = result.result.map(cat => cat.name.toString())
		}, error => {
			
		})
	}
}

