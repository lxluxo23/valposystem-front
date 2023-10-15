import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { cleanRut } from 'rutlib';
import { AlertHelper } from 'src/app/helpers/alert.helpers';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent {
  form = this.Fb.group({
    rutDni: ['', Validators.required],
    nombres: ['', Validators.required],
    apellidoPaterno: ['', Validators.required],
    apellidoMaterno: ['', Validators.required],
    nombreCalle: ['', Validators.required],
    numero: ['', Validators.required],
    restoDireccion: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    fechaNacimiento: ['', Validators.required]
  })
  constructor(
    private ref: DynamicDialogRef,
    private Fb: FormBuilder,
    public dialogService: DialogService,
    private mensajes: MessageService,
    private servicio: PersonService
  ) {

  }

  async agregar() {

    if (this.form.valid) {
      const rut = this.form.get('rutDni').value;
      let rutlimpio = cleanRut(rut);
      if (rutlimpio.charAt(0) === '0') {
        rutlimpio = rutlimpio.substring(1);
      }
      this.form.get('rutDni').setValue(rutlimpio.toLocaleUpperCase());
      await this.servicio.Crear(this.form.value).then((res) => {
        this.mensajes.add({ severity: 'success', summary: res })
        this.ref.close()
      }).catch((err) => {
        this.mensajes.add({ severity: 'error', summary: err.response.data })
      })
    }
    else {
      this.mensajes.add({ severity: 'error', summary: 'revise formulario' })
    }

  }
}
