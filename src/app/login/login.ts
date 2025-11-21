
import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms'; // Importamos FormsModule aquí
import { CommonModule } from '@angular/common'; // Útil si usas *ngIf, *ngFor
import { LoginService } from '../login.service'; // Tu servicio de login

@Component({
  selector: 'app-login',
  standalone: true, // Indicar que es un componente standalone
  imports: [
    CommonModule,
    FormsModule // Módulo necesario para usar NgForm y [(ngModel)]
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  // 1. ✅ Inyectar el servicio
  constructor(private loginService: LoginService) {}

  Login(form: NgForm) {
    if (form.invalid) {
      console.warn('Formulario inválido. Asegúrate de que los campos tienen name y son requeridos.');
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    // 2. ✅ Llamar al servicio
    this.loginService.login(email, password);

    form.reset();
  }

}
