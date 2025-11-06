// src/app/cursos-component/cursos-component.ts
import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CursosService } from "../cursos.service";
import { Course } from "./cursos.model";
import { Subscription } from "rxjs";
import Swal from 'sweetalert2'; // 👈 importa esto arriba del archivo


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
    // Mantengo tu línea original pero con protección: si el servicio no expone ese método,
    // intento usar un snapshot alternativo (para evitar errores en tiempo de compilación/ejecución).
    if ((this.cursosService as any).obtenerCursos) {
      // Si existe obtenerCursos() que devuelve array directo (compatibilidad)
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.cursos = this.cursosService.obtenerCursos() || [];
      } catch {
        this.cursos = [];
      }
    } else if ((this.cursosService as any).obtenerCursosSnapshot) {
      // si hay obtenerCursosSnapshot() (snapshot sync)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.cursos = this.cursosService.obtenerCursosSnapshot() || [];
    } else {
      // dejar el array vacío hasta que ngOnInit lo llene vía observable
      this.cursos = [];
    }
  }

  ngOnInit(): void {
    // Al iniciar, nos suscribimos al observable que provea cursos (si existe).
    // Buscamos los nombres de métodos que podrías tener: obtenerCursos1(), cursos$ o data directo.
    if ((this.cursosService as any).obtenerCursos1) {
      // obtenerCursos1() -> asumo que devuelve Observable<Course[]>
      this.sub = (this.cursosService as any).obtenerCursos1().subscribe({
        next: (misCursos: Course[]) => {
          console.log('misCursos', misCursos);
          this.cursos = misCursos || [];
          // si tu servicio tiene setCursos, actualizamos el snapshot central
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

    // Si el servicio expone un BehaviorSubject o cursos$ observable
    if ((this.cursosService as any).cursos$) {
      this.sub = (this.cursosService as any).cursos$.subscribe({
        next: (list: Course[]) => {
          this.cursos = list || [];
        },
        error: (err: any) => console.error('Error en cursos$:', err)
      });
      return;
    }

    // Fallback: si el servicio tiene un método obtenerCursos() que devuelva Observable
    if ((this.cursosService as any).obtenerCursos) {
      try {
        const posible = (this.cursosService as any).obtenerCursos();
        // si es observable, suscribimos; si es array, asignamos
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
    // Si el servicio expone agregarCurso, lo usamos; si no, intentamos push local + set en servicio.
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
    // Intentamos llamar al nombre de método que exista
    if ((this.cursosService as any).eliminarCurso) {
      (this.cursosService as any).eliminarCurso(indice);
    } else if ((this.cursosService as any).eliminarCursoPorIndice) {
      (this.cursosService as any).eliminarCursoPorIndice(indice);
    } else {
      // fallback local
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
  }

  // Mostrar formulario SweetAlert con los valores actuales
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
  //modal


  // Si el usuario confirmó y completó el formulario correctamente
  if (formValues) {
    cursoExistente.nombre = formValues.nombre;
    cursoExistente.descripcion = formValues.descripcion;
    cursoExistente.duracion = formValues.duracion;
    cursoExistente.precio = formValues.precio;

    // Actualizar en el servicio
    if ((this.cursosService as any).actualizarCurso) {
      (this.cursosService as any).actualizarCurso(indice, cursoExistente);
    } else {
      // fallback local
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
