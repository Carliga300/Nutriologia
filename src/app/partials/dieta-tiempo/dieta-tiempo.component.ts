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

  public tipo: string = "dieta-tiempo";
  public tipo_dia: string = "";
  public tipo_comida: string = "";
  public token: string = "";
  public errors: any = {};
  public editar: boolean = false;
  public idUser: Number = 0;
  public alimentosSeleccionados: any[] = [];
  public comidas: any[] = [];

  public dias: any[] = [
    { value: '1', nombre: 'Lunes' },
    { value: '2', nombre: 'Martes' },
    { value: '3', nombre: 'Miércoles' },
    { value: '4', nombre: 'Jueves' },
    { value: '5', nombre: 'Viernes' },
    { value: '6', nombre: 'Sábado' },
    { value: '7', nombre: 'Domingo' },
  ];

  constructor(
    private location: Location,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private tiempoService: TiempoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.comidas = this.tiempoService.obtenerComidas();
    
    this.tiempoService.alimentosSeleccionados$.subscribe(alimentos => {
      console.log('Alimentos seleccionados:', alimentos);
  
      if (this.tipo_dia && this.tipo_comida) {
        const dia = this.getSelectedDay();
        this.comidas.forEach(comida => {
          comida.alimentos = this.tiempoService.obtenerAlimentosPorDia(dia, this.tipo_comida);
        });
      }
      console.log('Comidas seleccionadas:', this.comidas);
    });
    
    if (this.tipo_dia) {
      const dia = this.getSelectedDay();
      this.updateComidas(dia);
      console.log(`Alimentos seleccionados para ${dia}:`, this.comidas);
    }
  }

  private getSelectedDay(): string {
    return this.dias.find(d => d.value === this.tipo_dia)?.nombre.toLowerCase() || '';
  }

  updateComidas(dia: string): void {
    if (dia) {
      this.comidas.forEach(comida => {
        comida.alimentos = this.tiempoService.obtenerAlimentosPorDia(dia, comida.nombre);
      });
    }
  }

  regresar() {
    this.location.back();
  }

  agregarAlimento(dia: string, comidaNombre: string, alimento: any) {
    const alimentos = this.tiempoService.obtenerAlimentosPorDia(dia, comidaNombre);
    if (alimentos && !alimentos.includes(alimento)) {
      alimentos.push(alimento);
      this.tiempoService.actualizarAlimentosPorDia(dia, comidaNombre, alimentos);
      console.log(`${alimento.nombre} agregado a ${comidaNombre} en ${dia}`);
    }
  }

  radioChange(event: MatRadioChange) {
    this.tipo_dia = event.value;
    const dia = this.getSelectedDay();
    this.updateComidas(dia);
  }

  onDayChange(event: MatRadioChange) {
    this.tipo_dia = event.value;
    const dia = this.getSelectedDay();
    this.updateComidas(dia);
  }

  seleccionarComida(tipoComida: string) {
    if (!this.tipo_dia) {
      alert('Por favor, selecciona un día antes de continuar.');
      return;
    }

    this.tipo_comida = tipoComida;
    const dia = this.getSelectedDay();
    console.log(`Seleccionando ${tipoComida} para ${dia}`);
    this.tiempoService.setTipoDia(dia);
    this.tiempoService.setTipoTiempo(tipoComida);
    this.router.navigate(['/proteinas']);
  }

  guardarAlimentos(comida: string, alimentos: any[]) {
    const dia = this.getSelectedDay();
    this.tiempoService.actualizarAlimentosPorDia(dia, comida, alimentos);
  }
}
