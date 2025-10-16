import { Component } from '@angular/core';
import { CalculadoraImpuestosService } from '../calculadora.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lab4inventario',
  imports: [FormsModule],
  templateUrl: './lab4inventario.html',
  styleUrls: ['./lab4inventario.scss'],
})
export class Lab4inventarioComponent {
  producto = {
    nombre: '',
    precioBase: 0,
    categoria: '',
  };

  constructor(private calculadora: CalculadoraImpuestosService) {}

  registrarProducto() {
    const resultado = this.calculadora.calcularPrecioFinal(
      this.producto.precioBase,
      this.producto.categoria
    );

   Swal.fire({
  title: 'Detalle del Producto',
  html: `
    <strong>Nombre del Producto:</strong> ${this.producto.nombre}<br>
    <strong>Categoría Aplicada:</strong> ${this.producto.categoria}<br>
    <strong>Precio Base:</strong> $${this.producto.precioBase.toFixed(2)}<br><br>
    <strong>Desglose de Costos:</strong><br>
    <strong>Tasa de IVA Aplicada:</strong> ${resultado.tasaIVA}%<br>
    <strong>Monto Total del IVA:</strong> $${resultado.montoIVA.toFixed(2)}<br>
    <strong>Precio Final (Total a Pagar):</strong> $${resultado.precioFinal.toFixed(2)}
  `,
  icon: 'info',
  confirmButtonText: 'Cerrar'
});

  }
}
