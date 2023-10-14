import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPersonComponent } from './list-person/list-person.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { PersonRoutingModule } from './person-routing.module';
import { PrimeNgModule } from '../PrimeNg.module';

@NgModule({
  declarations: [
    ListPersonComponent,
    AddPersonComponent,
    EditPersonComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    PrimeNgModule
  ],
  exports:[
    ListPersonComponent,
    AddPersonComponent,
    EditPersonComponent
  ]
})
export class PersonModule { }
