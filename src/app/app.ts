import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Empleado } from './empleado.model';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  titulo='EDUCADAPP';

  empleado:Empleado = new Empleado('','','',0);


  registrarEmpleado():void{
    console.log(`Usuario registrado: ${this.empleado.nombre} ${this.empleado.apellido}, Cargo: ${this.empleado.cargo}, Salario: ${this.empleado.salario}`);
    this.empleado = new Empleado('','','',0);
  }
}
