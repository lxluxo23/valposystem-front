import { Injectable } from '@angular/core';
import axios from 'axios';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AlertHelper } from '../helpers/alert.helpers';
@Injectable({
  providedIn: 'root',

})
export class PersonService {

  constructor(
    private alert: AlertHelper,
    private mensajes: MessageService,

  ) { }

  async TraerTodos() {
    try {
      this.alert.loadingAlert()
      const res = await axios.get(environment.API + 'person', {
        responseType: 'json',
      });
      if (res.status == 200) {
        Swal.close()
        return res.data;

      }
    } catch (err) {
      this.Errores(err);

    }
  }

  async Eliminar(id: any) {
    try {
      const res = await axios.delete(environment.API + 'person/' + id, {
        responseType: 'json',
      });
      if (res.status == 200) {
        return res.data
      }
    } catch (err) {
      this.Errores(err);
    }
  }

  async TraerID(id: any) {
    try {
      const res = await axios.get(environment.API + 'person/' + id, {
        responseType: 'json',
      });
      if (res.status == 200) {
        return res.data;
      }
    } catch (err) {
      this.Errores(err);
    }
  }

  async Crear(body: any) {
    const res = await axios.post(environment.API + 'person/', body);
    return res.data;
  }

  async Modificar(persona: any) {

    const res = await axios.put(environment.API + `person/${persona.id}`, persona, {
      responseType: 'json',
    });
    return res.data;


  }
  Errores(error: any) {
    console.error(error);
    Swal.close();
    this.mensajes.add({ severity: 'error', summary: error });

  }
}
