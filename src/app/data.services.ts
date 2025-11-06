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
      .put('https://educad-app1-default-rtdb.firebaseio.com/cursos.json', cursos)
      .subscribe(
        response => console.log("Cursos guardados correctamente", response),
        error => console.log("Error al guardar cursos:", error)
      );
  }
  cargar_Cursos() {
    return this.httpClient
      .get<Course[]>('https://educad-app1-default-rtdb.firebaseio.com/cursos.json');
  }

  actualizar_cursos(indice: number, curso: Course) {
    let url = 'https://educad-app1-default-rtdb.firebaseio.com/cursos/' + indice + '.json';
    this.httpClient.put(url, curso).subscribe(response => console.log('Curso actualizado correctamente:', response),
    error => console.log('Error al actualizar curso:', error));
   }
}
