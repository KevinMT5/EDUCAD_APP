import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule, NgFor],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.scss']
})
export class InicioComponent {

  // Cursos destacados temporales (mock)
  cursosDestacados = [
    {
      nombre: 'Diseño Gráfico Creativo',
      categoria: 'Diseño',
      imagen: '/assets/curso1.jpg'
    },
    {
      nombre: 'Fotografía Profesional',
      categoria: 'Fotografía',
      imagen: '/assets/curso2.jpg'
    },
    {
      nombre: 'Desarrollo Web con Angular',
      categoria: 'Tecnología',
      imagen: '/assets/curso3.jpg'
    }
  ];

  onImgError(event: Event) {
  (event.target as HTMLImageElement).src = '/assets/banner.jpg';
}

  constructor(private router: Router) {}

  // Navega a la página de cursos
  irACursos() {
    this.router.navigate(['/cursos']);
  }
}

