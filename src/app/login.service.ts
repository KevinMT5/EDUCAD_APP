import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: "root",
})
export class LoginService {
  // ...
  login(email: string, password: string) {
    // 🚨 Usamos getAuth() y las funciones modulares
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(response => {
        if (response.user) {
          return response.user.getIdToken();
        }
        return Promise.reject("Usuario no disponible.");
      })
      .then(token => {
        // ... (El resto de la lógica es la misma)
      })
      .catch(error => {
        console.error("Error en login:", error);
      });
  }
  // ...
}
