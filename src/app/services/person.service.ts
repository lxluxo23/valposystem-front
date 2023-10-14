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
  Errores(error:any) {
    console.error(error);
    Swal.close();
    this.mensajes.add({ severity: 'error', summary: error });
  
  }
}
