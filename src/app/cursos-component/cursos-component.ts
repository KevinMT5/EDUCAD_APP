// src/app/cursos-component/cursos-component.ts
import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CursosService } from "../cursos.service";
import { Course } from "./cursos.model";
import { Subscription } from "rxjs";
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-cursos-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cursos-component.html',
  styleUrls: ['./cursos-component.scss']
})
export class CursosComponent implements OnInit, AfterViewInit, OnDestroy {
  // Form (add)
  nombre: string = '';
  descripcion: string = '';
  duracion: string = '';
  precio: number = 0;
  categoria: string = '';
  imagenUrl: string = '';

  // Edit
  cursoEdit: any = {};
  indiceEdit: number | null = null;

  // Modal
  modalEditar: any;

  // Data
  cursos: Course[] = [];
  private sub?: Subscription;

  constructor(private cursosService: CursosService, private cd: ChangeDetectorRef) {}

  // -------------------------
  // Inicialización y carga
  // -------------------------
  ngOnInit(): void {
    // 1) Preferimos exponer cursos$ si existe
    if ((this.cursosService as any).cursos$) {
      this.sub = (this.cursosService as any).cursos$.subscribe({
        next: (list: Course[]) => {
          this.cursos = Array.isArray(list) ? list.slice() : [];
          this._asegurarIdsYCategorias();
          // Forzar render si es necesario
          this.cd.detectChanges();
        },
        error: (err: any) => console.error('Error en cursos$:', err)
      });
      return;
    }

    // 2) Intentamos con obtenerCursos1() (nombres alternativos)
    if ((this.cursosService as any).obtenerCursos1) {
      try {
        this.sub = (this.cursosService as any).obtenerCursos1().subscribe({
          next: (list: Course[]) => {
            this.cursos = Array.isArray(list) ? list.slice() : [];
            this._asegurarIdsYCategorias();
            this.cd.detectChanges();
          },
          error: (err: any) => console.error('Error obtenerCursos1():', err)
        });
        return;
      } catch (err) {
        console.warn('obtenerCursos1 existe pero al suscribir hubo error:', err);
      }
    }

    // 3) Fallback: obtenerCursos() que puede devolver Observable o Array
    if ((this.cursosService as any).obtenerCursos) {
      try {
        const posible = (this.cursosService as any).obtenerCursos();
        if (posible && typeof posible.subscribe === 'function') {
          this.sub = posible.subscribe({
            next: (list: Course[]) => {
              this.cursos = Array.isArray(list) ? list.slice() : [];
              this._asegurarIdsYCategorias();
              this.cd.detectChanges();
            },
            error: (err: any) => console.error('Error suscribiendo obtenerCursos():', err)
          });
        } else if (Array.isArray(posible)) {
          this.cursos = posible.slice();
          this._asegurarIdsYCategorias();
        }
      } catch (err) {
        console.error('Error llamando obtenerCursos():', err);
      }
      return;
    }

    // 4) Snapshot sync
    if ((this.cursosService as any).obtenerCursosSnapshot) {
      try {
        // @ts-ignore
        const snap = (this.cursosService as any).obtenerCursosSnapshot();
        if (Array.isArray(snap)) {
          this.cursos = snap.slice();
          this._asegurarIdsYCategorias();
        }
      } catch (err) {
        console.error('Error obtenerCursosSnapshot():', err);
      }
    }
  }

  ngAfterViewInit(): void {
    const modalEl = document.getElementById('modalEditarCurso');
    if (modalEl) {
      this.modalEditar = new bootstrap.Modal(modalEl);
    } else {
      console.warn('No se encontró el elemento #modalEditarCurso en el DOM.');
    }
  }

  // -------------------------
  // CRUD local + delegación a servicio
  // -------------------------
  onAgregarCurso() {
    // crear instancia manteniendo compatibilidad con Course
    const nuevoCurso = new Course(this.nombre, this.descripcion, this.duracion, this.categoria, this.precio, this.imagenUrl);

    // asignar id único si no existe
    (nuevoCurso as any).id = this._generarId();
    (nuevoCurso as any).categoria = this.categoria;

    // Delegar al servicio (se espera que el servicio maneje persistencia/observables)
    if ((this.cursosService as any).agregarCurso) {
      (this.cursosService as any).agregarCurso(nuevoCurso);
    } else {
      // fallback local si el servicio no expone método
      this.cursos.push(nuevoCurso);
      if ((this.cursosService as any).setCursos) {
        (this.cursosService as any).setCursos(this.cursos);
      }
    }

    this.limpiarFormulario();
  }

  onEliminarCurso(indice: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if ((this.cursosService as any).eliminarCurso) {
          (this.cursosService as any).eliminarCurso(indice);
        } else if ((this.cursosService as any).eliminarCursoPorIndice) {
          (this.cursosService as any).eliminarCursoPorIndice(indice);
        } else {
          // fallback local
          this.cursos.splice(indice, 1);
          if ((this.cursosService as any).setCursos) {
            (this.cursosService as any).setCursos(this.cursos);
          }
        }
        Swal.fire('Eliminado!', 'El curso ha sido eliminado.', 'success');
      }
    });
  }

  limpiarFormulario() {
    this.nombre = '';
    this.descripcion = '';
    this.duracion = '';
    this.precio = 0;
    this.categoria = 'Mercadeo';
  }

  actualizarCurso(indice: number) {
    const curso = this.cursos[indice];
    if (!curso) return;

    // copia para editar
    this.cursoEdit = { ...curso };
    this.indiceEdit = indice;

    if (this.modalEditar) {
      this.modalEditar.show();
    } else {
      console.warn('Modal no inicializado; no se puede abrir.');
    }
  }

  guardarCambios() {
    if (this.indiceEdit === null) return;

    // Validación
    if (!this.cursoEdit.nombre || !this.cursoEdit.descripcion || !this.cursoEdit.duracion ||
        this.cursoEdit.precio === null || this.cursoEdit.precio === '' || this.cursoEdit.precio < 0 ||
        !this.cursoEdit.categoria) {
      Swal.fire({
        icon: 'error',
        title: 'Error de Validación',
        text: 'Por favor completa todos los campos correctamente, incluyendo la categoría.'
      });
      return;
    }

    const indice = this.indiceEdit;
    this.cursoEdit.precio = Number(this.cursoEdit.precio);

    // Delegar actualización al servicio si existe
    if ((this.cursosService as any).actualizarCurso) {
      (this.cursosService as any).actualizarCurso(indice, this.cursoEdit);
    } else {
      // fallback local
      this.cursos[indice] = { ...this.cursoEdit };
      if ((this.cursosService as any).setCursos) {
        (this.cursosService as any).setCursos(this.cursos);
      }
    }

    if (this.modalEditar) {
      this.modalEditar.hide();
    }

    Swal.fire({
      icon: 'success',
      title: '¡Curso actualizado!',
      text: 'Los cambios se guardaron correctamente.',
      timer: 1500,
      showConfirmButton: false
    });

    this.indiceEdit = null;
    this.cursoEdit = {};
  }

  // -------------------------
  // Utilidades internas
  // -------------------------
  private _generarId(): string {
    // usa crypto.randomUUID cuando esté disponible, si no fallback a Date.now+random
    try {
      // @ts-ignore
      if (typeof crypto !== 'undefined' && typeof (crypto as any).randomUUID === 'function') {
        // @ts-ignore
        return (crypto as any).randomUUID();
      }
    } catch (e) {
      // no pasa nada, caemos al fallback
    }
    return String(Date.now()) + '-' + Math.floor(Math.random() * 1000000);
  }

  private _asegurarIdsYCategorias() {
    // Recorre cursos y agrega id/categoria por compatibilidad si faltan
    this.cursos = this.cursos.map((c: any) => {
      const copia = { ...c } as any;
      if (!copia.id) copia.id = this._generarId();
      if (!copia.categoria) copia.categoria = 'Sin categoría';
      return copia;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
