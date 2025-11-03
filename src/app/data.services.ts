// src/app/data.services.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Course } from "./cursos-component/cursos.model";

@Injectable({
  providedIn: 'root'
})
export class DataServices {
  constructor(private httpClient: HttpClient) {}

  guardarCursos(cursos: Course[]) {
    this.httpClient
      .post('https://educad-app1-default-rtdb.firebaseio.com/cursos.json', cursos)
      .subscribe(
        response => console.log("✅ Cursos guardados correctamente", response),
        error => console.log("❌ Error al guardar cursos:", error)
      );
  }
}
