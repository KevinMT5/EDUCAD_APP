// src/app/cursos.service.ts (Versión Optimizada)
import { Injectable } from "@angular/core";
import { Course } from "./cursos-component/cursos.model";
import { DataServices } from "./data.services";
import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  // BehaviorSubject para mantener la lista de cursos reactiva
  private cursosSubject = new BehaviorSubject<Course[]>([]);
  // Observable que el componente consumirá
  cursos$: Observable<Course[]> = this.cursosSubject.asObservable();

  constructor(private dataService: DataServices) {
    // Cargar los cursos al iniciar el servicio
    this.cargarCursosDesdeFirebase();
  }

  // Carga inicial y recarga
  cargarCursosDesdeFirebase() {
    this.dataService.cargar_Cursos()
      .subscribe({
        next: (misCursos: Course[]) => {
          // Si Firebase devuelve null, inicializa como array vacío.
          const cursosArray = misCursos || [];
          this.cursosSubject.next(cursosArray);
        },
        error: (err) => console.error('Error al cargar cursos desde Firebase:', err)
      });
  }

  // Obtiene el valor actual de los cursos
  private getCursosSnapshot(): Course[] {
    return this.cursosSubject.getValue();
  }

  agregarCurso(curso: Course) {
    const cursosActuales = this.getCursosSnapshot();
    cursosActuales.push(curso);
    this.dataService.guardarCursos(cursosActuales);
    // Notificar a todos los suscriptores (incluyendo el componente)
    this.cursosSubject.next(cursosActuales);
  }

  actualizarCurso(indice: number, curso: Course) {
    // Nota: El PUT de DataServices actualiza directamente en Firebase por índice.
    this.dataService.actualizar_cursos(indice, curso);

    // Actualizar también el Subject localmente para reactividad inmediata
    const cursosActuales = this.getCursosSnapshot();
    cursosActuales[indice] = curso;
    this.cursosSubject.next(cursosActuales);
  }

  eliminarCurso(indice: number) {
    const cursosActuales = this.getCursosSnapshot();
    cursosActuales.splice(indice, 1);

    // Al eliminar, es más seguro hacer un PUT completo para reindexar en Firebase
    this.dataService.guardarCursos(cursosActuales);
    this.cursosSubject.next(cursosActuales);
  }

  // Opcional: Si el componente necesita el Observable del servicio de datos directamente
  obtenerCursos1() {
    return this.dataService.cargar_Cursos();
  }
}
