import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { CursosComponent } from './cursos-component/cursos-component';
import { Shop } from './shop/shop';
import { Error404 } from './pages/error404/error404';
import { InicioComponent as INICIO } from './inicio/inicio';
import { LoginComponent } from './login-component/login-component';
import { CursoDetalleComponent } from './curso-detalle/curso-detalle';


export const routes: Routes = [

  {path: "",component: INICIO},
  {path: "shop",component: Shop},
  {path: "cursos-component",component: CursosComponent},
  {path: "login-component",component: LoginComponent},
 // {path: "cursos-component2",component: CursosComponent2},
  {path: "course/:id", component: CursoDetalleComponent},
  {path: "**",component: Error404},

];



