import { Component, Input, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { TiempoService } from 'src/services/tiempo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dieta-tiempo',
  templateUrl: './dieta-tiempo.component.html',
  styleUrls: ['./dieta-tiempo.component.scss']
})
export class DietaTiempoComponent implements OnInit {

  @Input() rol: string = "";
  @Input() datos_user: any = {};

  public tipo:string = "dieta-tiempo";
  public tipo_dia:string = "";
  public tiempo:any= {};
  public token: string = "";
  public errors:any={};
  public editar:boolean = false;
  public idUser: Number = 0;
  public alimentosSeleccionados: any[] = [];
  public comidas: any[] = [];

  public dias:any[]= [
    {value: '1', nombre: 'Lunes', comidas: this.comidas},
    {value: '2', nombre: 'Martes', comidas: this.comidas},
    {value: '3', nombre: 'Miércoles', comidas: this.comidas},
    {value: '4', nombre: 'Jueves', comidas: this.comidas},
    {value: '5', nombre: 'Viernes', comidas: this.comidas},
    {value: '6', nombre: 'Sábado', comidas: this.comidas},
    {value: '7', nombre: 'Domingo', comidas: this.comidas},
  ];

  constructor(
    private location: Location,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private tiempoService: TiempoService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.comidas = this.tiempoService.obtenerComidas();

    this.tiempoService.alimentosSeleccionados$.subscribe(alimentos => {
      console.log('Alimentos seleccionados:', alimentos);

      if (this.tipo_dia) {
        const comida = this.comidas.find(c => c.nombre === this.tipo_dia);
        if (comida) {
          comida.alimentos = [...alimentos];
        }
      }
      console.log('Comidas seleccionadas:', this.comidas);
      console.log('Tiempo:', this.tipo_dia);
    });
  }

  regresar() {
    this.location.back();
  }

  agregarAlimento(comidaNombre: string, alimento: any) {
    const comida = this.comidas.find(c => c.nombre === comidaNombre);
    if (comida && !comida.alimentos.includes(alimento)) {
      comida.alimentos.push(alimento);
      console.log(`${alimento.nombre} agregado a ${comidaNombre}`);
    }
  }

  radioChange(event: MatRadioChange) {
    this.tipo_dia = event.value;
  }

  navegar(tipo: string) {
    this.tipo_dia = tipo;
    console.log(`Navegando a seleccionar alimentos para ${tipo}`);
    this.tiempoService.setTipoDia(tipo);
    this.router.navigate(['/proteinas']);
  }

  guardarAlimentos(comida: string, alimentos: any[]) {
    this.tiempoService.actualizarAlimentosPorComida(comida, alimentos);
  }
}
