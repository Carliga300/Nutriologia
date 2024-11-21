import { Component, OnInit } from '@angular/core';
import { TiempoService } from 'src/services/tiempo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carbohidratos',
  templateUrl: './carbohidratos.component.html',
  styleUrls: ['./carbohidratos.component.scss']
})
export class CarbohidratosComponent implements OnInit {

  public alimentos: any[] = [
    { nombre: 'Arroz', src: '/assets/images/arroz.jpeg' },
    { nombre: 'Tortilla', src: '/assets/images/tortillas.jpeg' },
    { nombre: 'Pan integral', src: '/assets/images/pan.jpeg' },
    { nombre: 'Avena', src: '/assets/images/avena.jpeg' },
    { nombre: 'Cereal', src: '/assets/images/cereal.jpeg' },
    { nombre: 'Pasta', src: '/assets/images/pasta.jpeg' },
    { nombre: 'Frijoles', src: '/assets/images/frijoles.jpeg' },
    { nombre: 'Habas', src: '/assets/images/habas.jpeg' },
    { nombre: 'Alubias', src: '/assets/images/alubias.jpeg' },
    { nombre: 'Camote', src: '/assets/images/camote.jpeg' },
    { nombre: 'Lentejas', src: '/assets/images/lentejas.jpg' },
    { nombre: 'Amaranto', src: '/assets/images/amaranto.jpeg' },
  ];
  alimentosSeleccionados: any[] = [];
  public tipo_dia: string = '';

  constructor(
    private tiempoService: TiempoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tipo_dia = this.tiempoService.getTipoTiempo(); // Obtiene el valor del servicio
    this.alimentosSeleccionados = this.tiempoService.obtenerAlimentosSeleccionados(this.tipo_dia);
  }

  toggleSeleccion(alimento: string) {
    const index = this.alimentosSeleccionados.indexOf(alimento);
    if (index > -1) {
      this.alimentosSeleccionados.splice(index, 1);
    } else {
      this.alimentosSeleccionados.push(alimento);
    }
    this.tiempoService.actualizarAlimentosSeleccionados(this.tipo_dia, this.alimentosSeleccionados);
  }

  isSelected(alimento: string): boolean {
    return this.alimentosSeleccionados.includes(alimento);
  }

  siguiente() {
    this.tiempoService.actualizarAlimentosSeleccionados(this.tipo_dia, this.alimentosSeleccionados);
    this.router.navigate(['/dieta-tiempo']);
  }

  regresar() {
    this.router.navigate(['frutas/']);
  }

  guardarAlimentos() {
    if (this.tipo_dia) {
      this.tiempoService.actualizarAlimentosPorComida(this.tipo_dia, this.alimentosSeleccionados);
      console.log(`Alimentos guardados para ${this.tipo_dia}:`, this.alimentosSeleccionados);
    } else {
      console.warn('No se ha seleccionado un tipo de comida.');
    }
  }
}
