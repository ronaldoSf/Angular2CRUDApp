import { Component, OnInit, ViewChild, Inject, TemplateRef } from '@angular/core';
import { DialogConfig, DialogService } from '../../commom/dialog/dialog.service';
import { EditComponent, Util } from '../../commom/util';
import { FormConfigRow, Property } from '../../commom/forms/my.form.component';
import { EditTemplateComponent } from '../../commom/templates/edit/edit-template.component';
import { Profile } from '../../commom/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserEditComponent } from '../../user/edit/edit.user.component';
import { ProfileService } from '../profile.service';
import { InputFormConfig } from '../../commom/input.form/input.form.component';
import { CustomFormConfig } from '../../commom/custom.form/custom-form.component';
import { TreeNode } from 'primeng/components/common/treenode';
import { GROUP_PERMISSION } from '../../commom/permissions';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
  providers: [ ProfileService, DialogService ],	
})
export class ProfileEditComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<UserEditComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogService: DialogService,
      public profileService: ProfileService
    ) {
        if (data.entity) {
            this.profile = data.entity;
        }
    }
    
    @ViewChild("editTemplate")
    public editTemplate: EditTemplateComponent;


    @ViewChild("treeViewTemplateRef")
    public treeViewTemplateRef: TemplateRef<any>;
        
    public permissionsTree: TreeNode[] = [
            {
                "label": "Documents",
                "data": "Documents Folder",
                "expandedIcon": "fa-folder-open",
                "collapsedIcon": "fa-folder",
                "children": [{
                        "label": "Work",
                        "data": "Work Folder",
                        "expandedIcon": "fa-folder-open",
                        "collapsedIcon": "fa-folder",
                        "children": [{"label": "Expenses.doc", "icon": "fa-file-word-o", "data": "Expenses Document"}, {"label": "Resume.doc", "icon": "fa-file-word-o", "data": "Resume Document"}]
                    },
                    {
                        "label": "Home",
                        "data": "Home Folder",
                        "expandedIcon": "fa-folder-open",
                        "collapsedIcon": "fa-folder",
                        "children": [{"label": "Invoices.txt", "icon": "fa-file-word-o", "data": "Invoices for this month"}]
                    }]
            },
            {
                "label": "Pictures",
                "data": "Pictures Folder",
                "expandedIcon": "fa-folder-open",
                "collapsedIcon": "fa-folder",
                "children": [
                    {"label": "barcelona.jpg", "icon": "fa-file-image-o", "data": "Barcelona Photo"},
                    {"label": "logo.jpg", "icon": "fa-file-image-o", "data": "PrimeFaces Logo"},
                    {"label": "primeui.png", "icon": "fa-file-image-o", "data": "PrimeUI Logo"}]
            },
            {
                "label": "Movies",
                "data": "Movies Folder",
                "expandedIcon": "fa-folder-open",
                "collapsedIcon": "fa-folder",
                "children": [{
                        "label": "Al Pacino",
                        "data": "Pacino Movies",
                        "children": [{"label": "Scarface", "icon": "fa-file-video-o", "data": "Scarface Movie"}, {"label": "Serpico", "icon": "fa-file-video-o", "data": "Serpico Movie"}]
                    },
                    {
                        "label": "Robert De Niro",
                        "data": "De Niro Movies",
                        "children": [{"label": "Goodfellas", "icon": "fa-file-video-o", "data": "Goodfellas Movie"}, {"label": "Untouchables", "icon": "fa-file-video-o", "data": "Untouchables Movie"}]
                    }]
            }
    ]

    public formConfigs: FormConfigRow<Profile>[] = [
        {
            formConfigs: [
                new InputFormConfig(0, new Property("name"), [], false, "Nome"),
            ]
        },
        {
            formConfigs: [
                new CustomFormConfig(0, [], () => { return this.treeViewTemplateRef }),
            ]
        },
    ];

    public profile: Profile = new Profile()
    
    static dialogConfig: DialogConfig = {height: "auto", width: "400px"}
    
    ngOnInit() {
        this.makePermissionsTree()

        this.editTemplate.formConfigs = this.formConfigs
        this.editTemplate.windowTitle = this.profile.id > 0 ? "Editar perfíl" : "Novo perfíl";
        this.editTemplate.doSaveEvent = Util.createCallbackFunction(this, this.doSave)
        this.editTemplate.dialogRef = this.dialogRef
        this.editTemplate.entity = this.profile

        this.editTemplate.init()


    }

    myUserPermissions: {group: string, perm: string}[] = [
        {group: "USUARIO", perm: "LIST"},
        {group: "USUARIO", perm: "SHOW"},
        {group: "PERFIL", perm: "EDIT"},
        {group: "PERFIL", perm: "ADDD"},
        {group: "CONTA_RECEBER", perm: "REMV"},
    ]

    makePermissionsTree() {

        var treeNodes: TreeNode[] = []

        for(var group of GROUP_PERMISSION.allGroups) {

            var groupTreeNode: TreeNode = {label: group.DESCRIPTION, expandedIcon: "fa-folder-open", collapsedIcon: "fa-folder", children: [], expanded: true}

            for (var userPerm of this.myUserPermissions) {
                for (var perm of group.PERMISSIONS) {
                    if (group.GROUP == userPerm.group && perm.KEY == userPerm.perm) {
                        var permiTreeNode: TreeNode = {label: group.DESCRIPTION, expandedIcon: "fa-folder-open", collapsedIcon: "fa-folder", children: [], expanded: true}
                        groupTreeNode.children.push(permiTreeNode)
                    }
                }
            }
        }

        this.permissionsTree = treeNodes
    }

    doSave() {
        this.profileService.save()
    }

}
