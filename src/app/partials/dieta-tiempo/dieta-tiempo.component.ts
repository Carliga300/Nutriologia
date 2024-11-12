import { Component, Input, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { TiempoService } from 'src/services/tiempo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/services/facade.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditarUserModalComponent } from 'src/app/modals/editar-user-modal/editar-user-modal.component';
import * as $ from 'jquery';


@Component({
  selector: 'app-dieta-tiempo',
  templateUrl: './dieta-tiempo.component.html',
  styleUrls: ['./dieta-tiempo.component.scss']
})
export class DietaTiempoComponent implements OnInit{

  @Input() rol: string = "";
  @Input() datos_user: any = {};

  public tipo:string = "dieta-tiempo";
  public tipo_dia:string = "";
  public tiempo:any= {};
  public token: string = "";
  public errors:any={};
  public editar:boolean = false;
  public idUser: Number = 0;
  // Arreglo de alimentos seleccionados
  public alimentosSeleccionados: any[] = [];


  public comidas:any[]= [
    {value: '1', nombre: 'Desayuno',  alimentos: []},
    {value: '2', nombre: 'Comida',  alimentos: []},
    {value: '3', nombre: 'Cena',  alimentos: []},
  ];

  public dias:any[]= [
    {value: '1', nombre: 'Luneas', comidas: this.comidas},
    {value: '2', nombre: 'Martes', comidas: this.comidas},
    {value: '3', nombre: 'Miercoles', comidas: this.comidas},
    {value: '4', nombre: 'Jueves', comidas: this.comidas},
    {value: '5', nombre: 'Viernes', comidas: this.comidas},
    {value: '6', nombre: 'Sabado', comidas: this.comidas},
    {value: '7', nombre: 'Domingo', comidas: this.comidas},
  ];

  constructor(
    private location : Location,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private tiempoService: TiempoService,
    private facadeService: FacadeService,
    public dialog: MatDialog

  ){}

  ngOnInit(): void {
    /// Suscribirse a los cambios en los alimentos seleccionados
    this.tiempoService.alimentosSeleccionados$.subscribe(alimentosSeleccionados => {
      // Actualizar el arreglo de alimentos en la comida que corresponda
      this.comidas[0].alimentos = alimentosSeleccionados; // Asignar a "Desayuno"
    });
  }

  public regresar(){
    this.location.back();
  }

    // Método para agregar un alimento a una comida específica
  public agregarAlimento(comidaNombre: string, alimento: any) {
    const comida = this.comidas.find(c => c.nombre === comidaNombre);
    if (comida && !comida.alimentos.includes(alimento)) {
      comida.alimentos.push(alimento);
      console.log(`${alimento.nombre} agregado a ${comidaNombre}`);
    }
  }

  public radioChange(event: MatRadioChange) {

    if(event.value == "Lunes"){
      this.tipo_dia = "Lunes"
    }else if (event.value == "Martes"){
      this.tipo_dia = "Martes"
    }else if (event.value == "Miercoles"){
      this.tipo_dia = "Miercoles"
    }
  }

  public navegar(tipo: string) {
    this.router.navigate(['/proteina']);  // Navega a '/comida/tipo'
  }
}


