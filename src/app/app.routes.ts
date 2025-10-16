import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { ProyectosComponent } from './proyectos-component/proyectos-component';
import { QuienesComponent } from './quienes-component/quienes-component';
import { ContactoComponent } from './contacto-component/contacto-component';
import { CursosComponent } from './cursos-component/cursos-component';
import { Lab4inventarioComponent } from './lab4inventario/lab4inventario';

export const routes: Routes = [

  {path: "",component: HomeComponent},
  {path: "proyectos",component: ProyectosComponent},
  {path: "quienes",component: QuienesComponent},
  {path: "contacto",component: ContactoComponent},
  {path: "cursos",component: CursosComponent},
  {path: "lab4inventario",component: Lab4inventarioComponent}
];



