// importamos createAction y props para poder crear acciones y manejarlas con redux
import { createAction, props } from '@ngrx/store';

//creamos la acción send la cual recibe un props(multiplo de tipo number)
export const send = createAction('[Forms Component] Enviar', props<{ multiplo: number }>());

//creamos la acción receive la cual recibe un props(multiplo de tipo number)
export const receive = createAction('[Cards Component] Recibir', props<{ multiplo: number }>());
