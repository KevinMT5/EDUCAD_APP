import { Component } from '@angular/core';
import { CalculadoraImpuestosService } from '../calculadora.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lab4inventario',
  imports: [FormsModule],
  templateUrl: './lab4inventario.html',
  styleUrls: ['./lab4inventario.scss']
})
export class Lab4inventarioComponent {

  // Objeto para vincular con el formulario
  producto = {
    nombre: '',
    precioBase: 0,
    categoria: ''
  };

  constructor(private calculadora: CalculadoraImpuestosService) { }

  // Método que se ejecuta al enviar el formulario
  registrarProducto() {
    const resultado = this.calculadora.calcularPrecioFinal(this.producto.precioBase, this.producto.categoria);

    alert(`Detalle del Producto
Nombre del Producto: ${this.producto.nombre}
Categoría Aplicada: ${this.producto.categoria}
Precio Base: $${this.producto.precioBase.toFixed(2)}

Desglose de Costos
Tasa de IVA Aplicada: ${resultado.tasaIVA}%
Monto Total del IVA: $${resultado.montoIVA.toFixed(2)}
Precio Final (Total a Pagar): $${resultado.precioFinal.toFixed(2)}
`);
  }
}
