import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import * as firebase from "firebase/app";

@Component({
  selector: 'app-root',
  standalone: true,
  // 👇 aquí importamos todo lo necesario a nivel global
  imports: [
    CommonModule,     // para *ngIf, *ngFor, etc.
    FormsModule,      // para [(ngModel)]
    HttpClientModule, // para HttpClient en los servicios
    RouterOutlet      // para que funcione el enrutamiento,

  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  titulo = 'EDUCADAPP';



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    firebase.initializeApp({
      apiKey: "AIzaSyAuMU30S_Eu-QH1Mv_hooE1VRj3lcjrKFM",
      authDomain: "educad-app1.firebaseapp.com",
    });
  }
}
