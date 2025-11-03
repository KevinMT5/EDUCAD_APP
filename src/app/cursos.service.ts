// src/app/cursos.service.ts
import { Injectable } from "@angular/core";
import { Course } from "./cursos-component/cursos.model";
import { DataServices } from "./data.services";

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private cursos: Course[] = [];

  constructor(private dataService: DataServices) {}

  agregarCurso(curso: Course) {
    this.cursos.push(curso);
    this.dataService.guardarCursos(this.cursos);
    alert(`Curso agregado: ${curso.nombre}`);
  }

  obtenerCursos(): Course[] {
    return this.cursos;
  }

  eliminarCurso(indice: number) {
    this.cursos.splice(indice, 1);
    this.dataService.guardarCursos(this.cursos);
  }
}
