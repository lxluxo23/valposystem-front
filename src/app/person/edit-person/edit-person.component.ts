import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AlertHelper } from 'src/app/helpers/alert.helpers';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent implements OnInit {
  usuariotId: number;
  form = this.Fb.group({
    id: [''],
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
  constructor
    (private config: DynamicDialogConfig,
      private ref: DynamicDialogRef,
      private Fb: FormBuilder,
      private alert: AlertHelper,
      public dialogService: DialogService,
      private mensajes: MessageService,
      private servicio: PersonService) {

  }
  ngOnInit(): void {
    this.usuariotId = this.config.data.userId;
    this.TraerDatos(this.usuariotId);

  }

  async TraerDatos(id: number) {
    await this.servicio.TraerID(id).then((res) => {

      this.form.get("id").setValue(res.id)
      this.form.get("rutDni").setValue(res.rutDni)
      this.form.get("nombres").setValue(res.nombres)
      this.form.get("apellidoPaterno").setValue(res.apellidoPaterno)
      this.form.get("apellidoMaterno").setValue(res.apellidoMaterno)
      this.form.get("nombreCalle").setValue(res.nombreCalle)
      this.form.get("numero").setValue(res.numero)
      this.form.get("restoDireccion").setValue(res.restoDireccion)
      this.form.get("correo").setValue(res.correo)
      this.form.get("fechaNacimiento").setValue(res.fechaNacimiento)

    }).catch(err => {
      console.error(err);
    })
  }

  async Actualizar() {
    if (this.form.valid) {
      await this.servicio.Modificar(this.form.value).then((res) => {

        this.mensajes.add({ severity: 'success', summary: res })
        this.ref.close()
      }).catch(err => {
        this.mensajes.add({ severity: 'error', summary: err.response.data })
      })
    }
    else {
      this.mensajes.add({ severity: 'error', summary: 'revise formulario' })

    }
  }
}
