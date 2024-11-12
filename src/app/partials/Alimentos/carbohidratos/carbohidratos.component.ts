import { Component } from '@angular/core';
import { TiempoService } from 'src/services/tiempo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carbohidratos',
  templateUrl: './carbohidratos.component.html',
  styleUrls: ['./carbohidratos.component.scss']
})
export class CarbohidratosComponent {

  public alimentos:any[]= [
    { nombre: 'Arroz', src: '/assets/images/arroz.jpeg' },
    { nombre: 'Tortilla', src: '/assets/images/tortillas.jpeg' },
    { nombre: 'Pan integral', src: '/assets/images/pan.jpeg' },
    { nombre: 'Avena', src: '/assets/images/avena.jpeg' },
    { nombre: 'Cereeal', src: '/assets/images/ceereal.jpeg' },
    { nombre: 'Pasta', src: '/assets/images/pasta.jpeg' },
    { nombre: 'Frijoles', src: '/assets/images/frijoles.jpeg' },
    { nombre: 'Habas', src: '/assets/images/habas.jpeg' },
    { nombre: 'Alubias', src: '/assets/images/alubias.jpeg' },
    { nombre: 'Camote', src: '/assets/images/camote.jpeg' },
    { nombre: 'Lentejas', src: '/assets/images/lentejas.jpg' },
    { nombre: 'Amaranto', src: '/assets/images/amaranto.jpeg' },
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
    this.router.navigate(['dieta-tiempo/']);
  }

  public regresar() {
    this.router.navigate(['frutas/']);
  }

}
