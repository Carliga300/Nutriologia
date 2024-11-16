import { Component } from '@angular/core';
import { TiempoService } from 'src/services/tiempo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-verduras',
  templateUrl: './verduras.component.html',
  styleUrls: ['./verduras.component.scss']
})
export class VerdurasComponent {
  public alimentos:any[]= [
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
  alimentosSeleccionados: string[] = [];

  constructor(
    private tiempoService: TiempoService,
    private router: Router
  ){}

  ngOnInit(): void {
    // Carga los alimentos seleccionados del servicio al iniciar el componente
    this.alimentosSeleccionados = this.tiempoService.obtenerAlimentosSeleccionados();
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
    this.router.navigate(['frutas/']);
  }

  public regresar() {
    this.router.navigate(['proteinas/']);
  }

}
