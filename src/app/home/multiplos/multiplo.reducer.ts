// importamos createReduce y on para poder crear los reductores de redux
import { createReducer, on } from '@ngrx/store';
// importamos las acciones send y receive
import { send, receive } from './multiplo.actions';
// iniciamos el estado en 0
export const initialState = 0;
// creamos los reductores para cambiar el estado por el modificado
export const multiploReducer = createReducer(
  initialState,
  //cambiamos el estado por el que se nos envia
  on(send, (state, { multiplo }) => (state = multiplo)),
  on(receive, (state, { multiplo }) => (state = multiplo))
);
