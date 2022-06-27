import { Component, OnInit } from '@angular/core';
// importamos el store redux para poder hacer uso del stado  y la acción send que creamos
import { Store } from '@ngrx/store';
import { AppState } from '../multiplo.state';
import { send } from '../multiplo.actions';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  //Definimos el multiplo con! para que no salga en el input 0
  multiplo!: number;
  //Agregamos el parametro privado store de tipo Store de redux de tipo AppState
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
  // cambiamos el stado con la acción send enviando el parametro proporcionado
  encontrarMultiplo(multiplo: number) {
    if (multiplo) {
      this.store.dispatch(send({ multiplo }));
    }
  }
}
