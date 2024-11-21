import { Component, OnInit } from '@angular/core';
import { TiempoService } from 'src/services/tiempo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verduras',
  templateUrl: './verduras.component.html',
  styleUrls: ['./verduras.component.scss']
})
export class VerdurasComponent implements OnInit {

  public alimentos: any[] = [
    { nombre: 'Zanahoria', src: '/assets/images/zanahoria.jpeg' },
    { nombre: 'Repollo', src: '/assets/images/repollo.jpeg' },
    { nombre: 'Aguacate', src: '/assets/images/Aguacate.jpeg' },
    { nombre: 'Espinaca', src: '/assets/images/Espinacas.jpeg' },
    { nombre: 'Jitomate', src: '/assets/images/jitomate.jpeg' },
    { nombre: 'Brocoli', src: '/assets/images/Brocoli.jpeg' },
    { nombre: 'Chayote', src: '/assets/images/chayote.jpeg' },
    { nombre: 'Lechuga', src: '/assets/images/lechuga.jpeg' },
    { nombre: 'Apio', src: '/assets/images/apio.jpeg' },
    { nombre: 'Betabel', src: '/assets/images/betabel.jpeg' },
    { nombre: 'Pepino', src: '/assets/images/pepeino.jpeg' },
    { nombre: 'Papa', src: '/assets/images/papa.jpeg' },
  ];
  alimentosSeleccionados: any[] = [];
  public tipo_dia: string = '';

  constructor(
    private tiempoService: TiempoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tipo_dia = this.tiempoService.getTipoDia(); // Obtiene el valor del servicio
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
    this.router.navigate(['frutas/']);
  }

  regresar() {
    this.router.navigate(['proteinas/']);
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
