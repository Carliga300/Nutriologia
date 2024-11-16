import { Component } from '@angular/core';
import { TiempoService } from 'src/services/tiempo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-frutas',
  templateUrl: './frutas.component.html',
  styleUrls: ['./frutas.component.scss']
})
export class FrutasComponent {
  public alimentos:any[]= [
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
    this.router.navigate(['carbohidratos/']);
  }

  public regresar() {
    this.router.navigate(['verduras/']);
  }


}
