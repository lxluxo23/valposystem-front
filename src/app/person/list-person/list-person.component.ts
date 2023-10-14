import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.scss']
})
export class ListPersonComponent implements OnInit {

  constructor(
    private servicio:PersonService,
    private mensajes: MessageService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.Traerdatos()
  }

  async Traerdatos(){
 
    let respuesta = await this.servicio.TraerTodos();
    console.log(respuesta);
  }

}
