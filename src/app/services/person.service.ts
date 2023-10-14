import { Injectable } from '@angular/core';
import axios from 'axios';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
  
})
export class PersonService {

  constructor(
    private mensajes: MessageService,
    
  ) { }

  async TraerTodos() {
    try {
      const res = await axios.get(environment.API + 'person', {
        responseType: 'json',
      });
      if (res.status == 200) {
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
