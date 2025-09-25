import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Empleado } from './empleado.model';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,               // ✅ standalone si no usas AppModule
  imports: [FormsModule, NgForOf],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  titulo = 'EDUCADAPP';

  // propiedades enlazadas con ngModel
  nombre: string = '';
  apellido: string = '';
  cargo: string = '';
  salario: number = 0;

  empleados: Empleado[] = [
    new Empleado("Juan","Perez","Desarrollador",1200),
    new Empleado("Ana","Gomez","Diseñadora",1100),
    new Empleado("Luis","Martinez","Administrador",1300)
  ];

  agregarEmpleado() {
    const miEmpleado = new Empleado(this.nombre, this.apellido, this.cargo, this.salario);
    this.empleados.push(miEmpleado);
  }
}
