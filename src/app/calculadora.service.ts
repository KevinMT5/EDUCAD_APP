import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraImpuestosService {

  constructor() { }

  calcularPrecioFinal(precioBase: number, categoria: string) {
    let tasaIVA = 0;

    switch(categoria) {
      case 'Electronica':
        tasaIVA = 0.13;
        break;
      case 'Alimentos':
        tasaIVA = 0.05;
        break;
      case 'Libros':
        tasaIVA = 0; // Exento
        break;
      default:
        tasaIVA = 0;
    }

    const montoIVA = precioBase * tasaIVA;
    const precioFinal = precioBase + montoIVA;

    return {
      tasaIVA: tasaIVA * 100, // en porcentaje
      montoIVA,
      precioFinal
    };
  }
}
