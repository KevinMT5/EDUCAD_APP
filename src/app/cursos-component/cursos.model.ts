// src/app/cursos-component/cursos.model.ts
export class Course {
  nombre: string = "";
  descripcion: string = "";
  duracion: string = "";
  precio: number = 0;

  constructor(nombre: string, descripcion: string, duracion: string, precio: number) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.duracion = duracion;
    this.precio = precio;
  }
}
