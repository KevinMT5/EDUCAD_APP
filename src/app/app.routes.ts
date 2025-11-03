import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { CursosComponent } from './cursos-component/cursos-component';
import { Shop } from './shop/shop';
import { Error404 } from './pages/error404/error404';
import { INICIO } from './inicio/inicio';


export const routes: Routes = [

  {path: "",component: INICIO},
  {path: "shop",component: Shop},
  {path: "cursos-component",component: CursosComponent},
 // {path: "cursos-component2",component: CursosComponent2},
  {path: "**",component: Error404},

];



