import { Component, OnInit } from '@angular/core';
import { TiempoService } from 'src/services/tiempo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-frutas',
  templateUrl: './frutas.component.html',
  styleUrls: ['./frutas.component.scss']
})
export class FrutasComponent implements OnInit {

  public alimentos: any[] = [
    { nombre: 'Manzana', src: '/assets/images/manzana.jpeg' },
    { nombre: 'Platano', src: '/assets/images/platano.jpeg' },
    { nombre: 'Fresas', src: '/assets/images/fresas.jpeg' },
    { nombre: 'Mango', src: '/assets/images/mango.jpeg' },
    { nombre: 'Uva', src: '/assets/images/uvas.jpeg' },
    { nombre: 'Papaya', src: '/assets/images/papaya.jpeg' },
    { nombre: 'Sandia', src: '/assets/images/sandia.jpeg' },
    { nombre: 'Durazno', src: '/assets/images/durazno.jpeg' },
    { nombre: 'Melon', src: '/assets/images/melon.jpeg' },
    { nombre: 'Mandarina', src: '/assets/images/mandarina.jpeg' },
    { nombre: 'Pepino', src: '/assets/images/pepeino.jpeg' },
    { nombre: 'Pera', src: '/assets/images/pera.jpeg' },
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
    this.router.navigate(['carbohidratos/']);
  }

  regresar() {
    this.router.navigate(['verduras/']);
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
