export class Course {
  nombre: string = "";
  descripcion: string = "";
  duracion: string = "";
  precio: number = 0;
  imagen?: string;
  categoria?: string; // ✅ Nuevo campo opcional

  constructor(nombre: string, descripcion: string, duracion: string, precio: number, categoria?: string, imagen?: string) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.duracion = duracion;
    this.precio = precio;
    this.categoria = categoria || ''; // ✅ inicialización opcional
    this.imagen = imagen || '';       // ✅ inicialización opcional
  }
}
