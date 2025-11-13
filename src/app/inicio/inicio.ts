// src/app/inicio/inicio.ts
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { Subscription } from 'rxjs';
import { CursosService } from '../cursos.service';
import { Course } from '../cursos-component/cursos.model';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule, NgFor],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.scss']
})
export class InicioComponent implements OnInit, OnDestroy {

  cursosDestacados: Course[] = []; // Especificamos el tipo Course
  private sub?: Subscription;

  // Inyectamos Router, CursosService y ChangeDetectorRef (cd)
  constructor(
    private router: Router,
    private cursosService: CursosService,
    private cd: ChangeDetectorRef // 👈 Cambio 1: Inyección
  ) {}

  ngOnInit(): void {
    // Usamos la API reactiva cursos$ que ya hemos centralizado en el servicio.
    // Esto simplifica mucho el código de carga.
    if ((this.cursosService as any).cursos$) {
      this.sub = (this.cursosService as any).cursos$.subscribe({
        next: (list: Course[]) => {
          // Si la lista está vacía (null o []), se mantiene como array vacío.
          this.cursosDestacados = list || [];

          // 👈 Cambio 2: Forzar la detección de cambios
          this.cd.detectChanges();
        },
        error: (err: any) => {
          console.error('Error en cursos$:', err);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  // Navega a la página de cursos
  irACursos() {
    this.router.navigate(['/cursos']);
  }

  // fallback de imagen: si el curso tiene imagen la usamos, si no usamos placeholder
  obtenerImagen(curso: any): string {
    if (curso && curso.imagen) return curso.imagen;
    // si tu servicio almacena la ruta en otra propiedad, ajusta aquí
    if (curso && (curso as any).imageUrl) return (curso as any).imageUrl;
    return '/assets/placeholder.jpg';
  }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/banner.jpg';
  }
}
