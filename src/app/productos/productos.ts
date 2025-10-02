import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from './producto.model';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.scss']
})
export class ProductosComponent {
  productos: Producto[] = [
    { nombre: 'Laptop', stock: 3 },
    { nombre: 'Mouse', stock: 15 },
    { nombre: 'Teclado', stock: 2 },
    { nombre: 'Monitor', stock: 7 },
    { nombre: 'USB', stock: 5 }
  ];
}
