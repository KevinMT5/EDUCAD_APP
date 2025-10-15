import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Producto } from '../productos/producto.model';

@Component({
  selector: 'app-home-component',
  standalone: true, // ✅ necesario para usar imports
  imports: [CommonModule, RouterOutlet],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.scss']
})
export class HomeComponent implements OnInit {

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

  ngOnInit(): void {
    console.log('Componente HomeComponent inicializado');
  }
}
