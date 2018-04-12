import { State, City, Importance } from './../../commom/models';
import { ComboboxFormConfig } from './../../commom/combobox.form/combobox-form.component';
import { CategoryService } from './../../category/category.service';
import { InputFormConfig } from './../../commom/input.form/input.form.component';
import { RequiredValidator } from './../../commom/validators/required-validator.directive';
import { Validators } from '@angular/forms';
import { FormConfigRow, FormConfig, Property } from './../../commom/forms/my.form.component';
import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { DialogComponent, DialogConfig, DialogService } from '../../commom/dialog/dialog.service';
import { Util, EditComponent } from '../../commom/util';
import { CalendarFormComponent, CalendarFormConfig } from '../../commom/calendar.form/calendar-form.component';
import { MaskedInputFormComponent, MaskedInputFormConfig } from '../../commom/masked.input.form/masked-input-form.component';
import { CurrencyInputFormConfig } from '../../commom/currency.input.form/currency-input-form.component';
import { AutoCompleteFormConfig } from '../../commom/autocomplete.form/auto-complete-form.component';
import { Observable } from 'rxjs/Observable';
import { ClientService } from '../client.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client, Company, Profile, Category } from '../../commom/models';
import { CustomFormConfig } from '../../commom/custom.form/custom-form.component';
import { ViewChild } from '@angular/core';
import { FileHolder, ImageUploadComponent } from 'angular2-image-upload/lib/image-upload/image-upload.component';
import { DataBase, Config } from '../../commom/config';
import { MultiSelectFormConfig } from '../../commom/multi-select.form/multiselect-form.component';

@Component({
	selector: 'app-edit.client',
	templateUrl: './client.edit.component.html',
	styleUrls: ['./client.edit.component.scss'],
	providers: [ ClientService, CategoryService, DialogService ],	
})
export class ClientEditComponent extends EditComponent implements OnInit {

	constructor(public dialogRef: MatDialogRef<ClientEditComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogService: DialogService, 
		public clientService: ClientService,
		public categoryService: CategoryService,
	) {
		super();

		if (data.entity) {
			this.client = data.entity;

			this.client.categories.forEach(item => this.allCategories[item.name.toString()] = item)
			this.categoriesStrSelected = this.client.categories.map(cat => cat.name.toString())
		}

		this.mergeDefaultInfs();
	}

	mergeDefaultInfs() {
		let defaultInfs = [
			{label: "Telefone 1", type: "PHONE", icon: "phone", value: ""},
			{label: "Telefone 2", type: "PHONE_SEC", icon: "phone", value: ""},
			{label: "Facebook", type: "FACEBOOK", icon: "face", value: ""},
			{label: "Website" , type: "WEBSITE", icon: "web", value: ""},
			{label: "Endereço", type: "ADDRESS", icon: "place", value: ""},
		]
		
		if (this.client.informations) { 
			defaultInfs.forEach((item, index) => {
				let itemSaved = this.client.informations.find((savedItem) => savedItem.type == item.type)
				console.log("itemSaved" + itemSaved)
				if (itemSaved) {
					item.value = itemSaved.value;
				}
			})
		}

		console.log("defaultInfs" + JSON.stringify(defaultInfs))
		
		this.client.informations = defaultInfs
	}
	
	@ViewChild('imageUploaderTemplateRef') 
	public imageUploaderTemplate: TemplateRef<any>;
		
	@ViewChild('imageUploadComponent') 
	public imageUploadComponent: ImageUploadComponent;

	@ViewChild('clientInfsTemplateRef') 
	public clientInfsTemplate: TemplateRef<any>;

	@ViewChild('categoriesSelectorTemplateRef') 
	public categoriesSelectorTemplate: TemplateRef<any>;
	
	static dialogConfig: DialogConfig = {height: "auto", width: "600px"}

    public client: Client = new Client()
    
    //public categories: Category[] = []

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
			this.clientService.save({model: this.client}).subscribe(
				(result) => { 
                    if (result.status == "OK") {
                        this.client.id = result.id
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
		return this.client.id > 0 ? "Editar cliente" : "Novo cliente";
    }
    
    updateCategories() {
        /*this.categoryService.findByFilter({name: ""})
        .subscribe((result) => {
            if (result.status == "OK") {
                this.comboCategoriesConfig.itens = result.result.items;
                this.comboCategoriesConfig.component.updateCurrentValue();
            }
        }, (error) => {
            alert("Não foi possível carregar categorias")
        })*/
    }
    
    updateStates() {
        this.clientService.getStates({})
        .subscribe((result) => {
            //console.log("result.result.items" + result.result)
            if (result.status == "OK") {
                this.comboStatesConfig.itens = result.result;
                this.comboStatesConfig.component.updateCurrentValue();
                this.updateCities();
            }
        }, (error) => {
            alert("Não foi possível carregar categorias")
        })
    }
    
    updateCities() {
        this.clientService.getCitiesByState({ufSigla: this.client.ufSigla})
        .subscribe((result) => {
            //console.log("result.result.items" + result.result)
            if (result.status == "OK") {
                this.comboCitiesConfig.itens = result.result;
                this.comboCitiesConfig.component.updateCurrentValue();
                this.comboCitiesConfig.component.updateModelValue(false);
            }
        }, (error) => {
            alert("Não foi possível carregar categorias")
        })
    }

    makeFormConfig() {
		
    }

    get currentBase(): DataBase {
        return Config.currentBase;
	}

	_categoriesStrSelected: string[]
	_categoriesStr: string[]
	allCategories: Object = {}
	
    set categoriesStrSelected(itens: string[])  {
		this._categoriesStrSelected = itens
		this.client.categories = itens.map(item => this.allCategories[item])
	}
	
    get categoriesStrSelected(): string[] {
		return this._categoriesStrSelected
	}

    set categoriesStr(itens: string[])  {
		this._categoriesStr = itens
	}
	
    get categoriesStr(): string[] {
		return this._categoriesStr;
	}

	searchCategoriesByName(event) {
		this.categoryService.findByFilter({name: event.query})
		.subscribe(result => {
			//this.categoriesFormConfig.component.setItens(result.result.items)
			result.result.items.forEach(item => this.allCategories[item.name.toString()] = item)
			this.categoriesStr = result.result.items.map(cat => cat.name.toString())
		}, error => {
			
		})
	}

    //public comboCategoriesConfig = new ComboboxFormConfig<Client, Category>(200, new Property("categoryId"), [new RequiredValidator()], [], new Property("id"), new Property("name"), true, "Categoria...");
    public comboStatesConfig = new ComboboxFormConfig<Client, State>(0, new Property("ufSigla"), [new RequiredValidator()], [], new Property("sigla"), new Property("name"), true, "Estado...", this.updateCities.bind(this));
    public comboCitiesConfig = new ComboboxFormConfig<Client, City>(200, new Property("cityId"), [new RequiredValidator()], [], new Property("id"), new Property("name"), true, "Cidade...");
    //public categoriesFormConfig = new MultiSelectFormConfig<Client, Category>(200, new Property("categories"), [new RequiredValidator()], [], new Property("name"), this.searchCategoriesByName.bind(this), new Property("id"), "Categorias...");
    

	public formConfigs: FormConfigRow<Client>[] = [
		{
			formConfigs: [
				new InputFormConfig(200, new Property("name"), [new RequiredValidator()], false, "Nome"),
				new InputFormConfig(0, new Property("cnpj"), [], false, "CNPJ"),
			]
		}, {
			formConfigs: [
				new CustomFormConfig(0, [], () => this.categoriesSelectorTemplate)
				//new InputFormConfig(0, new Property("newPassword"), [new RequiredValidator()], true, "Nova Senha")
			]
		}, {
			formConfigs: [
				this.comboStatesConfig,
				this.comboCitiesConfig,
				//new InputFormConfig(0, new Property("newPassword"), [new RequiredValidator()], true, "Nova Senha")
			]
		}, {
			formConfigs: [
				new ComboboxFormConfig<Client, Importance>(170, new Property("importanceOrder"), [new RequiredValidator()], Importance.importances, new Property("value"), new Property("label"), true, "Ordem..."),
				new InputFormConfig(0, new Property("description"), [], false, "Detalhes do cliente"),
				//new InputFormConfig(0, new Property("newPassword"), [new RequiredValidator()], true, "Nova Senha")
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
		},
	]

	getPerfisByName(valueStr: String): Observable<Client> {
			return Observable.create(observer => {
					let newItens = [new Profile(1, "Umaa"), new Profile(2, "Duaaas"), new Profile(4, "Quaaatro")]
					observer.next(newItens);
					observer.complete();
			});
	}
	
	ngOnInit() {
        this.updateCategories();
        this.updateStates();
	}

	onUploadFinished(file: FileHolder) {
		console.log(JSON.stringify(file.serverResponse));
		let response = (file.serverResponse as any)._body
		let body = JSON.parse(response)

		this.imageUploadComponent.deleteAll()
		this.client.image = body.result.link
	}
	
	onRemoved(file: FileHolder) {
	// do some stuff with the removed file.
	}
	
	onUploadStateChanged(state: boolean) {
		console.log(JSON.stringify(state));
	}

}

