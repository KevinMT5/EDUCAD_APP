// src/app/curso-detalle/curso-detalle.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

// 1. 🚨 RUTA DE IMPORTACIÓN AJUSTADA (basada en tu imagen)
// Sube un nivel (a 'app') y luego entra a 'cursos-component'
import { Course } from '../cursos-component/cursos.model';

// 2. 🚨 RUTA DE IMPORTACIÓN DEL SERVICIO
// Sube un nivel (a 'app') y busca el servicio
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-curso-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './curso-detalle.html',
  styleUrls: ['./curso-detalle.scss']
})
export class CursoDetalleComponent implements OnInit, OnDestroy {

  curso?: Course;
  cursoId: number = -1;
  private sub?: Subscription;

  constructor(
    private route: ActivatedRoute, // Para leer el ID de la URL
    private router: Router,
    private cursosService: CursosService // Para obtener los datos
  ) {}

  ngOnInit(): void {
    // 3. Lee el parámetro 'id' de la URL
    this.route.params.subscribe(params => {
      this.cursoId = +params['id']; // El '+' convierte el string a número
      this.cargarCurso();
    });
  }

  cargarCurso(): void {
    // 4. Se suscribe al servicio para obtener la lista de cursos
    this.sub = this.cursosService.cursos$.subscribe(cursos => {

        // 5. FUNCIONALIDAD: Busca el curso por su índice (ID)
        if (cursos && cursos.length > this.cursoId && this.cursoId >= 0) {
            this.curso = cursos[this.cursoId];
        } else if (cursos && cursos.length > 0) {
            // Si el ID es inválido, redirige
            console.warn('ID de curso no válido:', this.cursoId);
            this.router.navigate(['/shop']);
        }
        // Si los cursos aún no cargan, this.curso es undefined y el HTML muestra "Cargando..."
    });
  }

  // Lógica para el botón "Inscribirse"
  comprarCurso(): void {
    alert(`¡Inscripción exitosa al curso: ${this.curso?.nombre}!`);
    this.router.navigate(['/shop']);
  }

  ngOnDestroy(): void {
    // 6. Limpia la suscripción al destruir el componente
    this.sub?.unsubscribe();
  }
}
