import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos-component',
  imports: [],
  templateUrl: './cursos-component.html',
  styleUrl: './cursos-component.scss'
})
export class CursosComponent {

  constructor(private router: Router) { }

  volverHome() {
    this.router.navigate(['']);
  }

}
