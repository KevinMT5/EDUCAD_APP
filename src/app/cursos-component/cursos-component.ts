// src/app/cursos-component/cursos-component.ts
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CursosService } from "../cursos.service";
import { Course } from "./cursos.model";

@Component({
  selector: 'app-cursos-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cursos-component.html',
  styleUrls: ['./cursos-component.scss']
})
export class CursosComponent {
  nombre: string = '';
  descripcion: string = '';
  duracion: string = '';
  precio: number = 0;

  cursos: Course[] = [];

  constructor(private cursosService: CursosService) {
    this.cursos = this.cursosService.obtenerCursos();
  }

  onAgregarCurso() {
    const nuevoCurso = new Course(this.nombre, this.descripcion, this.duracion, this.precio);
    this.cursosService.agregarCurso(nuevoCurso);
    this.limpiarFormulario();
  }

  onEliminarCurso(indice: number) {
    this.cursosService.eliminarCurso(indice);
  }

  limpiarFormulario() {
    this.nombre = '';
    this.descripcion = '';
    this.duracion = '';
    this.precio = 0;
  }
}
