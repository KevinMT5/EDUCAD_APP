// src/app/cursos.service.ts
import { Injectable } from "@angular/core";
import { Course } from "./cursos-component/cursos.model";
import { DataServices } from "./data.services";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  cursos: Course[] = [];

  constructor(private dataService: DataServices) {}

  agregarCurso(curso: Course) {
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


  actualizarCurso(indice: number, curso: Course) {
    this.cursos[indice] = curso;
    this.dataService.actualizar_cursos(indice, curso);
  }

  eliminarCurso(indice: number) {

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
  }
}
