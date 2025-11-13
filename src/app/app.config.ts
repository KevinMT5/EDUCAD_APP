// src/app/app.config.ts

import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

// 1. IMPORTACIONES DE FIREBASE (@angular/fire modern SDK)
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';


// 2. 🔑 CREDENCIALES DE FIREBASE (PEGA TUS VALORES REALES AQUÍ)
// Definimos el objeto de configuración.
const firebaseConfig = {
  apiKey: "TU_API_KEY", // 🚨 Reemplaza
  authDomain: "educad-app1-default-rtdb.firebaseapp.com",
  projectId: "educad-app1",
  storageBucket: "TU_STORAGE_BUCKET", // 🚨 Reemplaza
  messagingSenderId: "TU_SENDER_ID", // 🚨 Reemplaza
  appId: "TU_APP_ID" // 🚨 Reemplaza
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),

    // 3. INICIALIZAR FIREBASE Y PROVEER MÓDULOS

    // Inicializamos la aplicación de Firebase. Quitamos la aserción 'as firebase.FirebaseOptions'
    // para evitar el error de importación y permitimos que initializeApp infiera el tipo.
    provideFirebaseApp(() => initializeApp(firebaseConfig)),

    // Proveemos los servicios específicos de Firebase que se inyectan en los componentes/servicios
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ]
};
