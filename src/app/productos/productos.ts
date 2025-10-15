import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from './producto.model';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule ,],
  templateUrl: './productos.html',
  styleUrls: ['./productos.scss']
})
export class ProductosComponent {
  productos: Producto[] = [
    { nombre: 'Laptop', stock: 10 },
    { nombre: 'Mouse', stock: 15 },
    { nombre: 'Teclado', stock: 2 },
    { nombre: 'Monitor', stock: 5 },
    { nombre: 'USB', stock: 5 },
    { nombre: 'Disco Duro', stock: 8 },
    { nombre: 'Memoria RAM', stock: 12 },
    { nombre: 'Tarjeta Gráfica', stock: 5 },
    { nombre: 'Fuente de Poder', stock: 6 },
    { nombre: 'Placa Madre', stock: 3 }

  ];
}
