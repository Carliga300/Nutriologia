import { Component, OnInit } from '@angular/core';
import { TiempoService } from 'src/services/tiempo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proteinas',
  templateUrl: './proteinas.component.html',
  styleUrls: ['./proteinas.component.scss']
})
export class ProteinasComponent implements OnInit {

  public alimentos: any[] = [
    { nombre: 'Sardina', src: '/assets/images/sardina.jpg' },
    { nombre: 'Pollo', src: '/assets/images/pollo.jpeg' },
    { nombre: 'Cerdo', src: '/assets/images/cerdo.jpg' },
    { nombre: 'Cordero', src: '/assets/images/cordero.jpg' },
    { nombre: 'Huevo', src: '/assets/images/huevo.jpg' },
    { nombre: 'Chuleta', src: '/assets/images/chuleta.jpg' },
    { nombre: 'Res', src: '/assets/images/res.jpeg' },
    { nombre: 'Almendras', src: '/assets/images/almendras.jpg' },
    { nombre: 'Cacahuate', src: '/assets/images/cacahuate.jpg' },
    { nombre: 'Atún', src: '/assets/images/atun.jpg' },
    { nombre: 'Leche', src: '/assets/images/leches.jpeg' },
    { nombre: 'Queso', src: '/assets/images/queso.jpg' },
  ];
  alimentosSeleccionados: any[] = [];
  public tipo_dia: string = '';
  public tipo_comida: string = '';

  constructor(
    private tiempoService: TiempoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tipo_dia = this.tiempoService.getTipoDia(); // Obtiene el día seleccionado
    this.tipo_comida = this.tiempoService.getTipoTiempo(); // Obtiene el tipo de comida seleccionado
    this.alimentosSeleccionados = this.tiempoService.obtenerAlimentosSeleccionados(this.tipo_comida);
  }

  toggleSeleccion(alimento: string) {
    const index = this.alimentosSeleccionados.indexOf(alimento);
    if (index > -1) {
      this.alimentosSeleccionados.splice(index, 1);
    } else {
      this.alimentosSeleccionados.push(alimento);
    }
    this.tiempoService.actualizarAlimentosSeleccionados(this.tipo_comida, this.alimentosSeleccionados);
  }

  isSelected(alimento: string): boolean {
    return this.alimentosSeleccionados.includes(alimento);
  }

  siguiente() {
    this.tiempoService.actualizarAlimentosSeleccionados(this.tipo_comida, this.alimentosSeleccionados);
    this.router.navigate(['verduras/']);
  }

  regresar() {
    this.router.navigate(['dieta-tiempo/']);
  }

  guardarAlimentos() {
    if (this.tipo_dia) {
      this.tiempoService.actualizarAlimentosSeleccionados(this.tipo_comida, this.alimentosSeleccionados);
      console.log(`Alimentos guardados para ${this.tipo_dia} - ${this.tipo_comida}:`, this.alimentosSeleccionados);
    } else {
      console.warn('No se ha seleccionado un tipo de comida.');
    }
  }
}
