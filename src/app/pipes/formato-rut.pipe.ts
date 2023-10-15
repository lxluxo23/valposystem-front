import { Pipe, PipeTransform } from '@angular/core';
import { getLastDigitOfRut } from 'rutlib';

@Pipe({
  name: 'formatoRut'
})
export class FormatoRutPipe implements PipeTransform {

  transform(value: number,): string {

    var aux: string = value.toString();
    let aux2=(aux.slice(0, - 1))
    let dv = getLastDigitOfRut(Number(aux2));
    //dv = (dv == 'K') ? '0' : dv ;
    aux= aux2 + dv;
    return (
      aux.slice(0, -7) +
        '.' +
        aux.slice(-7, -4) +
        '.' +
        aux.slice(-4, -1) +
        '-' +
        aux.slice(-1)
    );
  
  }

}
