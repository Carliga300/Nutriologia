import { Component } from '@angular/core';
import { TiempoService } from 'src/services/tiempo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proteinas',
  templateUrl: './proteinas.component.html',
  styleUrls: ['./proteinas.component.scss']
})
export class ProteinasComponent {

  public alimentos:any[]= [
    { nombre: 'Sardina', src: '/assets/images/sardina.jpg' },
    { nombre: 'Pollo', src: '/assets/images/pollo.jpeg' },
    { nombre: 'Cerdo', src: '/assets/images/cerdo.jpg' },
    { nombre: 'Cordero', src: '/assets/images/cordero.jpg' },
    { nombre: 'Huevo', src: '/assets/images/huevo.jpg' },
    { nombre: 'Chuleta', src: '/assets/images/chuleta.jpg' },
    { nombre: 'Res', src: '/assets/images/res.jpeg' },
    { nombre: 'Almendras', src: '/assets/images/almendras.jpg' },
    { nombre: 'Cacahuate', src: '/assets/images/cacahuate.jpg' },
    { nombre: 'Atun', src: '/assets/images/atun.jpg' },
    { nombre: 'Leche', src: '/assets/images/leches.jpeg' },
    { nombre: 'Queso', src: '/assets/images/queso.jpg' },
  ];
  alimentosSeleccionados: string[] = [];

  constructor(
    private tiempoService: TiempoService,
    private router: Router
  ){}

  ngOnInit(): void {
     // Imprimir el arreglo de alimentos seleccionados al inicio
     console.log('Alimentos seleccionados al inicio:', this.alimentosSeleccionados);
  }
toggleSeleccion(alimento: string) {
    const index = this.alimentosSeleccionados.indexOf(alimento);
    if (index > -1) {
      this.alimentosSeleccionados.splice(index, 1);
    } else {
      this.alimentosSeleccionados.push(alimento);
    }
    // Enviar el arreglo actualizado al servicio
    this.tiempoService.actualizarAlimentosSeleccionados(this.alimentosSeleccionados);
  }

  // Método para verificar si un alimento está seleccionado
  isSelected(alimento: string): boolean {
    return this.alimentosSeleccionados.includes(alimento);
  }

  public siguiente() {
    this.router.navigate(['verduras/']);
  }

  public regresar() {
    this.router.navigate(['dieta-tiempo/']);
  }

}
