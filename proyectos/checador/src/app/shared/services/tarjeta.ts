import { Time } from '@angular/common';

export interface Tarjeta {
    semana:number;
    periodo_de:Date;
    periodo_a:Date;
    nombre:string;
    grupo:string;
    dia:string;
    entrada:number;
    salida:number;
    latitud:number;
    longitud:number;
    retraso:number;
    xtra1:string;
    xtra2:string;
 }