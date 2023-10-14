import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AlertHelper } from 'src/app/helpers/alert.helpers';
import { Person } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.scss']
})
export class ListPersonComponent implements OnInit {
  personas: Person[]
  constructor(
   
    private servicio:PersonService,
    private mensajes: MessageService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.Traerdatos()
  }

  async Traerdatos(){
 
    this.personas = await this.servicio.TraerTodos();
    console.log(this.personas);
    
  }

}
