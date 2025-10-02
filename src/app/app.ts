import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { ProductosComponent } from './productos/productos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, NgForOf, ProductosComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  titulo = 'EDUCADAPP';
}
