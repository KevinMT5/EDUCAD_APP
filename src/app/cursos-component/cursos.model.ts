export class Course {
  nombre: string = "";
  descripcion: string = "";
  duracion: string = "";
  categoria?: string; //
  precio: number = 0;


  constructor(nombre: string, descripcion: string, duracion: string, categoria: string, precio: number) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.duracion = duracion;
    this.categoria = categoria ;
    this.precio = precio;
  }
}
