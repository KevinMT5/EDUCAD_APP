// src/app/cursos.service.ts (Versión Optimizada)
import { Injectable } from "@angular/core";
import { Course } from "./cursos-component/cursos.model";
import { DataServices } from "./data.services";
<<<<<<< HEAD
import { BehaviorSubject, Observable, tap } from "rxjs";
=======
import Swal from "sweetalert2";
>>>>>>> 1fc7e69dcfac7ec925e0fe7e9b8519d6a91a1006

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
<<<<<<< HEAD
    const cursosActuales = this.getCursosSnapshot();
    cursosActuales.push(curso);
    this.dataService.guardarCursos(cursosActuales);
    // Notificar a todos los suscriptores (incluyendo el componente)
    this.cursosSubject.next(cursosActuales);
  }

=======
    this.cursos.push(curso);
    this.dataService.guardarCursos(this.cursos);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Curso agregado exitosamente',
      text: 'El curso ha sido agregado correctamente.',
      showConfirmButton: false,
      timer: 1500
    })
  }

  obtenerCursos(): Course[] {
    return this.cursos;
  }

  obtenerCursos1(){
    return this.dataService.cargar_Cursos();
  }


>>>>>>> 1fc7e69dcfac7ec925e0fe7e9b8519d6a91a1006
  actualizarCurso(indice: number, curso: Course) {
    // Nota: El PUT de DataServices actualiza directamente en Firebase por índice.
    this.dataService.actualizar_cursos(indice, curso);

    // Actualizar también el Subject localmente para reactividad inmediata
    const cursosActuales = this.getCursosSnapshot();
    cursosActuales[indice] = curso;
    this.cursosSubject.next(cursosActuales);
  }

  eliminarCurso(indice: number) {
<<<<<<< HEAD
    const cursosActuales = this.getCursosSnapshot();
    cursosActuales.splice(indice, 1);

    // Al eliminar, es más seguro hacer un PUT completo para reindexar en Firebase
    this.dataService.guardarCursos(cursosActuales);
    this.cursosSubject.next(cursosActuales);
  }

  // Opcional: Si el componente necesita el Observable del servicio de datos directamente
  obtenerCursos1() {
    return this.dataService.cargar_Cursos();
=======

    const curso = this.cursos[indice];

    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el curso "${curso.nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.cursos.splice(indice, 1);
        this.dataService.guardarCursos(this.cursos);


        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Curso eliminado exitosamente',
          showConfirmButton: false,
          timer: 1500

        });
      }
    });
  }


  setCursos(misCursos: Course[]) {
    this.cursos = misCursos;
>>>>>>> 1fc7e69dcfac7ec925e0fe7e9b8519d6a91a1006
  }
}
