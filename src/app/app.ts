import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  // 👇 aquí importamos todo lo necesario a nivel global
  imports: [
    CommonModule,     // para *ngIf, *ngFor, etc.
    FormsModule,      // para [(ngModel)]
    HttpClientModule, // para HttpClient en los servicios
    RouterOutlet      // para que funcione el enrutamiento
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  titulo = 'EDUCADAPP';
}
