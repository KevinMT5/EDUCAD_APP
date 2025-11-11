// src/app/cursos-component/cursos-component.ts
import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CursosService } from "../cursos.service";
import { Course } from "./cursos.model";
import { delay, Subscription } from "rxjs";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cursos-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cursos-component.html',
  styleUrls: ['./cursos-component.scss']
})
export class CursosComponent implements OnInit, OnDestroy {
  nombre: string = '';
  descripcion: string = '';
  duracion: string = '';
  precio: number = 0;

  cursos: Course[] = [];
  private sub?: Subscription;

  constructor(private cursosService: CursosService) {
    if ((this.cursosService as any).obtenerCursos1) {

      try {
        this.cursos = this.cursosService.obtenerCursos() || [];
      } catch {
        this.cursos = [];
      }
    } else if ((this.cursosService as any).obtenerCursosSnapshot) {

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.cursos = this.cursosService.obtenerCursosSnapshot() || [];
    } else {

      this.cursos = [];
    }
  }

  ngOnInit(): void {

    if ((this.cursosService as any).obtenerCursos1) {

      this.sub = (this.cursosService as any).obtenerCursos1().subscribe({
        next: (misCursos: Course[]) => {
          console.log('misCursos', misCursos);
          this.cursos = misCursos || [];

          if ((this.cursosService as any).setCursos) {
            (this.cursosService as any).setCursos(this.cursos);
          }
        },
        error: (err: any) => {
          console.error('Error al obtener cursos (obtenerCursos1):', err);
        }
      });
      return;
    }

    if ((this.cursosService as any).cursos$) {
      this.sub = (this.cursosService as any).cursos$.subscribe({
        next: (list: Course[]) => {
          this.cursos = list || [];
        },
        error: (err: any) => console.error('Error en cursos$:', err)
      });
      return;
    }

    if ((this.cursosService as any).obtenerCursos) {
      try {
        const posible = (this.cursosService as any).obtenerCursos();
        if (posible && typeof posible.subscribe === 'function') {
          this.sub = posible.subscribe({
            next: (data: Course[]) => this.cursos = data || [],
            error: (err: any) => console.error('Error al suscribir a obtenerCursos():', err)
          });
        } else {
          this.cursos = posible || [];
        }
      } catch (err) {
        console.error('Error intentando usar obtenerCursos fallback:', err);
      }
    }
  }

  onAgregarCurso() {
    const nuevoCurso = new Course(this.nombre, this.descripcion, this.duracion, this.precio);
    if ((this.cursosService as any).agregarCurso) {
      (this.cursosService as any).agregarCurso(nuevoCurso);
    } else {
      this.cursos.push(nuevoCurso);
      if ((this.cursosService as any).setCursos) {
        (this.cursosService as any).setCursos(this.cursos);
      }
    }
    this.limpiarFormulario();
  }

  onEliminarCurso(indice: number) {
    if ((this.cursosService as any).eliminarCurso) {
      (this.cursosService as any).eliminarCurso(indice);
    } else if ((this.cursosService as any).eliminarCursoPorIndice) {
      (this.cursosService as any).eliminarCursoPorIndice(indice);
    } else {
      this.cursos.splice(indice, 1);
      if ((this.cursosService as any).setCursos) {
        (this.cursosService as any).setCursos(this.cursos);
      }
    }
  }

  limpiarFormulario() {
    this.nombre = '';
    this.descripcion = '';
    this.duracion = '';
    this.precio = 0;
  }
 async actualizarCurso(indice: number) {
  const cursoExistente = this.cursos[indice];
  if (!cursoExistente) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Curso no encontrado para actualizar.',
    });
    return;
    delay(1000);
  }

  const { value: formValues } = await Swal.fire({
    title: 'Actualizar curso',
    html: `
      <input id="nombre" class="swal2-input" placeholder="Nombre" value="${cursoExistente.nombre}">
      <input id="descripcion" class="swal2-input" placeholder="Descripción" value="${cursoExistente.descripcion}">
      <input id="duracion" class="swal2-input" placeholder="Duración" value="${cursoExistente.duracion}">
      <input id="precio" type="number" class="swal2-input" placeholder="Precio" min="0" value="${cursoExistente.precio}">
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Guardar cambios',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    preConfirm: () => {
      const nombre = (document.getElementById('nombre') as HTMLInputElement).value.trim();
      const descripcion = (document.getElementById('descripcion') as HTMLInputElement).value.trim();
      const duracion = (document.getElementById('duracion') as HTMLInputElement).value.trim();
      const precioStr = (document.getElementById('precio') as HTMLInputElement).value;
      const precio = parseFloat(precioStr);

      if (!nombre || !descripcion || !duracion || isNaN(precio)) {
        Swal.showValidationMessage('Por favor completa todos los campos correctamente.');
        return null;
      }

      return { nombre, descripcion, duracion, precio };
    }


  });



  if (formValues) {
    cursoExistente.nombre = formValues.nombre;
    cursoExistente.descripcion = formValues.descripcion;
    cursoExistente.duracion = formValues.duracion;
    cursoExistente.precio = formValues.precio;

    if ((this.cursosService as any).actualizarCurso) {
      (this.cursosService as any).actualizarCurso(indice, cursoExistente);
    } else {
      this.cursos[indice] = cursoExistente;
      if ((this.cursosService as any).setCursos) {
        (this.cursosService as any).setCursos(this.cursos);
      }
    }

    Swal.fire({
      icon: 'success',
      title: '¡Curso actualizado!',
      text: 'Los cambios se guardaron correctamente.',
      timer: 1500,
      showConfirmButton: false
    });
  }
}

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
