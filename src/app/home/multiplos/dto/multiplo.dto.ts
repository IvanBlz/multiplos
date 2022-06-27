// creamos las interfaces de un Objeto de transeferencia de datos
export interface multiploDTO {
  value: number;
  color: string;
  multiplos?: string;
}

export interface resultadoDTO {
  peticion: number;
  resultado: multiploDTO[];
}
