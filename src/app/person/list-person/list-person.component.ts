import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AlertHelper } from 'src/app/helpers/alert.helpers';
import { Person } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';
import { EditPersonComponent } from '../edit-person/edit-person.component';
import Swal from 'sweetalert2';
import { AddPersonComponent } from '../add-person/add-person.component';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.scss'],
  providers: [DialogService,MessageService]
})
export class ListPersonComponent implements OnInit {
  personas: Person[]
  constructor(
    private alert: AlertHelper,
    private servicio:PersonService,
    private mensajes: MessageService,
    public dialogService: DialogService,
  ) { }
  ngOnInit(): void {
    this.Traerdatos()
  }

  async Traerdatos(){
 
    this.personas = await this.servicio.TraerTodos();
    console.log(this.personas);
    
  }
  editarUsuario(id: number) {
    const ref = this.dialogService.open(EditPersonComponent, {
      data: {
        userId: id
      },
      header: 'Editar Usuario',
      width: '70%'
    });
    ref.onClose.subscribe(res=>{
      this.Traerdatos()
    })
    
  }

  Agregar() {
    const ref = this.dialogService.open(AddPersonComponent, {
      
      header: 'Agregar Persona',
      width: '70%'
    });
    ref.onClose.subscribe(res=>{
      this.Traerdatos()
    })
    
  }

  async EliminarUsuario(id:any){

    Swal.fire({
      title: 'Eliminar?',
      text: "Se eliminara el cliente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff0000',
      cancelButtonColor: '#6c736e',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.alert.loadingAlert()
        try {
          this.servicio.Eliminar(id).then((res) => {
            this.mensajes.add({ severity: 'success', summary: res });
            Swal.close();
            this.Traerdatos();
          })
          
        } catch (error) {
          console.error(error);
          Swal.close();
        }
      }
    })
  }

}
