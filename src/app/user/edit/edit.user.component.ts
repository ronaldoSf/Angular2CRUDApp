import { InputFormConfig } from './../../commom/input.form/input.form.component';
import { RequiredValidator } from './../../commom/validators/required-validator.directive';
import { Validators } from '@angular/forms';
import { FormConfigRow, FormConfig, Property } from './../../commom/forms/my.form.component';
import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogConfig, DialogService } from '../../commom/dialog/dialog.service';
import { Usuario, Empresa, Perfil } from '../../commom/models';
import { Util } from '../../commom/util';
import { CalendarFormComponent, CalendarFormConfig } from '../../commom/calendar.form/calendar-form.component';
import { MaskedInputFormComponent, MaskedInputFormConfig } from '../../commom/masked.input.form/masked-input-form.component';
import { ComboboxFormConfig } from '../../commom/combobox.form/combobox-form.component';
import { CurrencyInputFormConfig } from '../../commom/currency.input.form/currency-input-form.component';
import { AutoCompleteFormConfig } from '../../commom/autocomplete.form/auto-complete-form.component';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';

@Component({
	selector: 'app-edit.user',
	templateUrl: './edit.user.component.html',
	styleUrls: ['./edit.user.component.scss'],
	providers: [ UserService, DialogService ],	
})
export class UserEditComponent extends DialogComponent implements OnInit {

	constructor(public dialogService: DialogService, public userService: UserService) {
		super()
	}

	static dialogConfig:DialogConfig = {height: "auto", width: "400px"}

	//public usuario: Usuario = {codigo: 1, nome: "a", login: "s", senha: "d", perfilCod: 1, empresaCod: 2, perfilNome: "", empresaNome: "", testeData: new Date(), testeEmpresa: new Empresa(3, "Umaa"), testeNumber: 80.798, testePerfil: new Perfil(2, "asdfasd")}
	public usuario: Usuario = new Usuario()

	public empresas: Empresa[] = [new Empresa(1, "Umaa"), new Empresa(2, "Duaaas"), new Empresa(3, "Treees"), new Empresa(4, "Quaaatro")]
	public perfis: Perfil[] = [new Perfil(1, "Umaa"), new Perfil(2, "Duaaas"), new Perfil(3, "Treees"), new Perfil(4, "Quaaatro")]
	
	/*public formConfigs: FormConfigRow<Usuario>[] = [
		{
				formConfigs: [
					new InputFormConfig(new Property("nome"), []),
					new InputFormConfig(new Property("login"), [new RequiredValidator()]),
					new InputFormConfig(new Property("senha"), [new RequiredValidator()], true),
					new CalendarFormConfig(new Property("testeData"), []),
					//new MaskedInputFormConfig(new Property("testeCpf"), [], Util.Masks.cpf),
					new ComboboxFormConfig<Usuario, Empresa>(new Property("testeEmpresa"), [], this.empresas, new Property("codigo"), new Property("nome"), false),
					new CurrencyInputFormConfig(new Property("testeNumber"), []),
					new AutoCompleteFormConfig<Usuario, Perfil>(new Property("testePerfil"), [], this.perfis, new Property("nome"), (valueStr) => { return this.getPerfisByName(valueStr) }),
				]
		}
	]*/

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
					this.usuario.codigo = result.id
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
		return this.usuario.codigo > 0 ? "Editar usuário" : "Novo usuário";
	}

	public formConfigs: FormConfigRow<Usuario>[] = [
		{
				formConfigs: [
					new InputFormConfig(200, new Property("nome"), [], false, "Nome"),
					new InputFormConfig(0, new Property("login"), [new RequiredValidator()], false, "Login"),
				]
		}, {
			formConfigs: [
				new InputFormConfig(0, new Property("novaSenha"), [new RequiredValidator()], true, "Nova Senha")
			]
		}, {
			formConfigs: [
				new ComboboxFormConfig<Usuario, Empresa>(0, new Property("empresaCod"), [new RequiredValidator()], this.empresas, new Property("codigo"), new Property("nome"), true, "Empresa..."),
				new ComboboxFormConfig<Usuario, Perfil>(0, new Property("perfilCod"), [], this.perfis, new Property("codigo"), new Property("nome"), true, "Perfil..."),
			]
		}
	]

	getPerfisByName(valueStr: String): Observable<Perfil> {
			return Observable.create(observer => {
					let newItens = [new Perfil(1, "Umaa"), new Perfil(2, "Duaaas"), new Perfil(4, "Quaaatro")]
					observer.next(newItens);
					observer.complete();
			});
	}
	
	ngOnInit() {
	}

}

