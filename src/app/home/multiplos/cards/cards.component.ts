import { Component, OnInit } from '@angular/core';

// importamos el store redux para poder hacer uso del estado
import { Store } from '@ngrx/store';
// importamos interfaces
import { AppState } from '../multiplo.state';
import { multiploDTO, resultadoDTO } from '../dto/multiplo.dto';
// importamos servicios
import { MultiplosService } from '../multiplos.service.ts.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  multiplo: number = 0;
  multiploDto: multiploDTO[] = [];
  loading: boolean = true;
  save: boolean = false;
  // Agregamos el parametro privado store de tipo Store de redux de tipo AppState
  // Agregamos el parametro privado multiploService para poder hacer uso de los servicios creados
  constructor(private store: Store<AppState>, private multiplosService: MultiplosService) {}

  ngOnInit(): void {
    //Escuchamos los cambios del estado
    this.store.select('value').subscribe((data) => {
      // loading en true en lo que se termina buscar los multiplos
      this.loading = true;
      this.multiploDto = [];
      // ejecutamos el metodo para encontrar los multiplos y guardamos los multiplos encontrados en multiploDto
      this.multiploDto = this.encontrarMultiplos(data);
      this.multiplo = data;
      // pones un setTime de 10 ms y pasados se quite el loading
      setTimeout(() => {
        this.loading = false;
      }, 10);
    });
  }

  // Encontrar multiplos entre 0 y el parametro proporcionado
  encontrarMultiplos(value: number) {
    // Encuentre los múltiplos del 3, 5 y 7 que existan entre el 0 y el número que ingresó el usuario
    // a. Múltiplos del 3 en VERDE
    // b. Múltiplos de 5 en ROJO
    // c. Múltiplos de 7 en AZUL

    // creamos item de tipo multiploDTO
    let items: multiploDTO = {
      value: 0,
      color: 'info',
    };
    // creamos multiplos de tipo multiploDTO[]
    let multiplos: multiploDTO[] = [];
    // ejecutamos el ciclo for para poder formar el resultado con los multiplos
    for (let i = 1; i <= value; i++) {
      // validamos que el residuo de la división de i / 7 sea 0 y así saber que es multiplo de 7
      if (i % 7 === 0 && i % 3 !== 0 && i % 5 !== 0) {
        // agregamos el número que es multiplo de 7 y también el color en base a bootstrap
        items = {
          value: i,
          color: 'primary',
        };
      }

      // validamos que el residuo de la división de i / 5 sea 0 y así saber que es multiplo de 5
      if (i % 5 === 0 && i % 3 !== 0) {
        // agregamos el número que es multiplo de 5 y también el color en base a bootstrap
        items = {
          value: i,
          color: 'danger',
        };
        // con el operador ternario verificamos si el numero i tambien es multipo de 7, en caso que lo sea
        // se le da un valor a multiplos del objeto items [5 y 7]
        i % 7 === 0 ? (items.multiplos = '[5 y 7]') : '';
      }

      // validamos que el residuo de la división de i / 3 sea 0 y así saber que es multiplo de 3
      if (i % 3 === 0) {
        // agregamos el número que es multiplo de 3 y también el color en base a bootstrap
        items = {
          value: i,
          color: 'success',
        };

        // con el operador ternario verificamos si el numero i tambien es multipo de 7 y de 5, en caso que lo sea
        // se le da un valor a multiplos del objeto items [3, 5 y 7]
        i % 7 === 0 && i % 5 === 0 ? (items.multiplos = '[3, 5 y 7]') : '';

        // con el operador ternario verificamos si el numero i tambien es multipo de 7, en caso que lo sea
        // se le da un valor a multiplos del objeto items [3 y 7]
        i % 7 === 0 && i % 5 !== 0 ? (items.multiplos = '[3 y 7]') : '';

        // con el operador ternario verificamos si el numero i tambien es multipo de 5, en caso que lo sea
        // se le da un valor a multiplos del objeto items [3 y 7]
        i % 7 !== 0 && i % 5 === 0 ? (items.multiplos = '[3 y 5]') : '';
      }
      // validamos de que i sea multiplo de 3, 5 o 7 y así solo conservar los multiplos
      if (i % 3 === 0 || i % 5 === 0 || i % 7 === 0) {
        // agregamos un nuevo elemento a multiplos
        multiplos.push(items);
      }
    }

    return multiplos;
  }

  guardarResultado() {
    // creamos la constante resultado de tipo resultadoDTO con el parametro proporcionado y el resultado de los multiplos encontrados
    const resultado: resultadoDTO = {
      peticion: this.multiplo,
      resultado: this.multiploDto,
    };

    //  del servicio multiplosService hacemos uso del metodo getResultados y nos suscribimos para poder hacer una validación y guardar
    this.multiplosService.getResultados(this.multiplo).subscribe((data) => {
      //  buscamos si de los datos devueltos existe ya una petición con el parametro proporcionado
      const result = data.filter((data) => data.peticion == this.multiplo);
      //  si no existe ningún registro entonces lo guardamos con el metodo saveResultados del servicio multiplosService
      // cambiamos a true el valor de save para mostrar el mensaje de Resultados guardados! el cual se muestra por 2 segundos
      if (result.length === 0) {
        this.multiplosService.saveResultados(resultado);
        this.save = true;
      }
    });

    setTimeout(() => {
      this.save = false;
    }, 2000);
  }
}
