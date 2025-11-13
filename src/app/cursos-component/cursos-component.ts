// src/app/cursos-component/cursos-component.ts
import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CursosService } from "../cursos.service";
import { Course } from "./cursos.model";
<<<<<<< HEAD
import { Subscription } from "rxjs";
import Swal from 'sweetalert2';

declare var bootstrap: any;
=======
import { delay, Subscription } from "rxjs";
import Swal from 'sweetalert2';
>>>>>>> 1fc7e69dcfac7ec925e0fe7e9b8519d6a91a1006

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
  categoria: string = '';   // <-- nueva propiedad
  precio: number = 0;
  categoria: string = 'Mercadeo';

  // Edit
  cursoEdit: any = {};
  indiceEdit: number | null = null;

  // Modal
  modalEditar: any;

  // Data
  cursos: Course[] = [];
  private sub?: Subscription;

<<<<<<< HEAD
  constructor(private cursosService: CursosService, private cd: ChangeDetectorRef) {}
=======
  constructor(private cursosService: CursosService) {
    if ((this.cursosService as any).obtenerCursos1) {
      try {
        this.cursos = this.cursosService.obtenerCursos() || [];
      } catch {
        this.cursos = [];
      }
    } else if ((this.cursosService as any).obtenerCursosSnapshot) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.cursos = this.cursosService.obtenerCursosSnapshot() || [];
    } else {
      this.cursos = [];
    }
  }
>>>>>>> 1fc7e69dcfac7ec925e0fe7e9b8519d6a91a1006

  // -------------------------
  // Inicialización y carga
  // -------------------------
  ngOnInit(): void {
<<<<<<< HEAD
    // 1) Preferimos exponer cursos$ si existe
=======
    if ((this.cursosService as any).obtenerCursos1) {
      this.sub = (this.cursosService as any).obtenerCursos1().subscribe({
        next: (misCursos: Course[]) => {
          console.log('misCursos', misCursos);
          this.cursos = misCursos || [];
          if ((this.cursosService as any).setCursos) {
            (this.cursosService as any).setCursos(this.cursos);
          }
        },
        error: (err: any) => {
          console.error('Error al obtener cursos (obtenerCursos1):', err);
        }
      });
      return;
    }

>>>>>>> 1fc7e69dcfac7ec925e0fe7e9b8519d6a91a1006
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

<<<<<<< HEAD
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
=======
>>>>>>> 1fc7e69dcfac7ec925e0fe7e9b8519d6a91a1006
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


  onAgregarCurso() {
<<<<<<< HEAD
    const nuevoCurso = new Course(this.nombre, this.descripcion, this.duracion, this.precio);

    (nuevoCurso as any).id = this._generarId();
    (nuevoCurso as any).categoria = this.categoria;

=======
    const nuevoCurso = new Course(this.nombre, this.descripcion, this.duracion, this.categoria, this.precio);
>>>>>>> 1fc7e69dcfac7ec925e0fe7e9b8519d6a91a1006
    if ((this.cursosService as any).agregarCurso) {
      (this.cursosService as any).agregarCurso(nuevoCurso);
    } else {
      this.cursos.push(nuevoCurso);
      if ((this.cursosService as any).setCursos) {
        (this.cursosService as any).setCursos(this.cursos);
      }
    }

    this.limpiarFormulario();
  }

  onEliminarCurso(indice: number) {
<<<<<<< HEAD
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
          this.cursos.splice(indice, 1);
          if ((this.cursosService as any).setCursos) {
            (this.cursosService as any).setCursos(this.cursos);
          }
        }
        Swal.fire('Eliminado!', 'El curso ha sido eliminado.', 'success');
=======
    if ((this.cursosService as any).eliminarCurso) {
      (this.cursosService as any).eliminarCurso(indice);
    } else if ((this.cursosService as any).eliminarCursoPorIndice) {
      (this.cursosService as any).eliminarCursoPorIndice(indice);
    } else {
      this.cursos.splice(indice, 1);
      if ((this.cursosService as any).setCursos) {
        (this.cursosService as any).setCursos(this.cursos);
>>>>>>> 1fc7e69dcfac7ec925e0fe7e9b8519d6a91a1006
      }
    });
  }

  limpiarFormulario() {
    this.nombre = '';
    this.descripcion = '';
    this.duracion = '';
    this.categoria = '';
    this.precio = 0;
<<<<<<< HEAD
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
=======
  }

  async actualizarCurso(indice: number) {
    const cursoExistente = this.cursos[indice];
    if (!cursoExistente) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Curso no encontrado para actualizar.',
      });
      return;
    }

    const { value: formValues } = await Swal.fire({
      title: 'Actualizar curso',
      html: `
  <input id="nombre" class="swal2-input" placeholder="Nombre" value="${cursoExistente.nombre}">
  <input id="descripcion" class="swal2-input" placeholder="Descripción" value="${cursoExistente.descripcion}">
  <input id="duracion" class="swal2-input" placeholder="Duración" value="${cursoExistente.duracion}">
  <select id="categoria" class="swal2-input">
    <option value="" disabled ${!cursoExistente.categoria ? 'selected' : ''}>Seleccione una categoría</option>
    <option value="Mercadeo" ${cursoExistente.categoria === 'Mercadeo' ? 'selected' : ''}>Mercadeo</option>
    <option value="Pedagogía" ${cursoExistente.categoria === 'Pedagogía' ? 'selected' : ''}>Pedagogía</option>
    <option value="Programación" ${cursoExistente.categoria === 'Programación' ? 'selected' : ''}>Programación</option>
    <option value="Diseño Gráfico" ${cursoExistente.categoria === 'Diseño Gráfico' ? 'selected' : ''}>Diseño Gráfico</option>
    <option value="Desarrollo Personal" ${cursoExistente.categoria === 'Desarrollo Personal' ? 'selected' : ''}>Desarrollo Personal</option>
    <option value="Tecnología" ${cursoExistente.categoria === 'Tecnología' ? 'selected' : ''}>Tecnología</option>
    <option value="Arte" ${cursoExistente.categoria === 'Arte y Música' ? 'selected' : ''}>Arte y Música</option>
  </select>
  <input id="precio" type="number" class="swal2-input" placeholder="Precio" min="0" value="${cursoExistente.precio}">
`,

      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar cambios',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      preConfirm: () => {
        const nombre = (document.getElementById('nombre') as HTMLInputElement).value.trim();
        const descripcion = (document.getElementById('descripcion') as HTMLInputElement).value.trim();
        const duracion = (document.getElementById('duracion') as HTMLInputElement).value.trim();
        const categoria = (document.getElementById('categoria') as HTMLInputElement).value.trim();
        const precioStr = (document.getElementById('precio') as HTMLInputElement).value;
        const precio = parseFloat(precioStr);

        if (!nombre || !descripcion || !duracion || !categoria || isNaN(precio)) {
          Swal.showValidationMessage('Por favor completa todos los campos correctamente.');
          return null;
        }

        return { nombre, descripcion, duracion, categoria, precio };
      }
    });

    if (formValues) {
      cursoExistente.nombre = formValues.nombre;
      cursoExistente.descripcion = formValues.descripcion;
      cursoExistente.duracion = formValues.duracion;
      cursoExistente.categoria = formValues.categoria;
      cursoExistente.precio = formValues.precio;

      if ((this.cursosService as any).actualizarCurso) {
        (this.cursosService as any).actualizarCurso(indice, cursoExistente);
      } else {
        this.cursos[indice] = cursoExistente;
        if ((this.cursosService as any).setCursos) {
          (this.cursosService as any).setCursos(this.cursos);
        }
      }

      Swal.fire({
        icon: 'success',
        title: '¡Curso actualizado!',
        text: 'Los cambios se guardaron correctamente.',
        timer: 1500,
        showConfirmButton: false
      });
    }
>>>>>>> 1fc7e69dcfac7ec925e0fe7e9b8519d6a91a1006
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
