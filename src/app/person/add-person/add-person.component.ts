import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AlertHelper } from 'src/app/helpers/alert.helpers';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent {
  form = this.Fb.group({
    id: [''], 
    rutDni: ['', Validators.required],
    nombres: ['', Validators.required],
    apellidoPaterno: ['', Validators.required],
    apellidoMaterno: ['',Validators.required],
    nombreCalle: ['',Validators.required],
    numero: ['',Validators.required],
    restoDireccion: ['',Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    fechaNacimiento: ['',Validators.required]
  })
  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private Fb: FormBuilder,
    private alert: AlertHelper,
    public dialogService: DialogService,
    private mensajes: MessageService,
    private servicio: PersonService
  ){

  }
}
