// src/app/auth.service.ts (Lógica con Firebase Auth)
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import firebase from 'firebase/compat/app'; // Importar firebase base
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importar AngularFireAuth

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: boolean = false; // Mantenemos la propiedad de estado

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth // 👈 Inyectar AngularFireAuth
  ) {
    // Suscribirse al estado de autenticación para mantener 'loggedIn' actualizado
    this.afAuth.authState.subscribe(user => {
      this.loggedIn = !!user; // true si hay usuario, false si es null
    });
  }

  // ... (Puedes eliminar el método login(usuario, clave) con mocks si solo usas Google)

  // ----------------------------------------------------
  // Método Único: Login con Google
  // ----------------------------------------------------
  loginWithGoogle(): Observable<firebase.auth.UserCredential> {
    // 1. Crear el proveedor de Google
    const provider = new firebase.auth.GoogleAuthProvider();

    // 2. Usar signInWithPopup y convertir la Promesa a Observable
    return from(this.afAuth.signInWithPopup(provider));
  }

  // ----------------------------------------------------
  // Logout (Con Firebase)
  // ----------------------------------------------------
  logout(): void {
    this.afAuth.signOut().then(() => {
      this.loggedIn = false;
      this.router.navigate(['/']);
    });
  }

  // ----------------------------------------------------
  // Estado (Se mantiene)
  // ----------------------------------------------------
  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
