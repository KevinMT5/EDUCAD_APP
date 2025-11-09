// src/app/cursos.service.ts
import { Injectable } from "@angular/core";
import { Course } from "./cursos-component/cursos.model";
import { DataServices } from "./data.services";

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  cursos: Course[] = [];

  constructor(private dataService: DataServices) {}

  agregarCurso(curso: Course) {
    this.cursos.push(curso);
    this.dataService.guardarCursos(this.cursos);
    alert(`Curso agregado: ${curso.nombre}`);
  }

  obtenerCursos(): Course[] {
    return this.cursos;
  }

  // Obtener una instantánea de los cursos actuales consumido desde el servicio de datos VV
  obtenerCursos1(){
    return this.dataService.cargar_Cursos();
  }


  actualizarCurso(indice: number, curso: Course) {
    this.cursos[indice] = curso;
    this.dataService.actualizar_cursos(indice, curso);
  }

  eliminarCurso(indice: number) {
    this.cursos.splice(indice, 1);
    this.dataService.guardarCursos(this.cursos);
  }

  setCursos(misCursos: Course[]) {
    this.cursos = misCursos;
  }
}
