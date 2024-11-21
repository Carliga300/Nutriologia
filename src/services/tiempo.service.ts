import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ValidatorService } from './tools/validator.service';
import { ErrorService } from './tools/error.service';
import { environment } from 'src/environments/environment';
import { FacadeService } from './facade.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TiempoService {
  private alimentosPorDia = {
    lunes: { desayuno: [], comida: [], cena: [] },
    martes: { desayuno: [], comida: [], cena: [] },
    miércoles: { desayuno: [], comida: [], cena: [] },
    jueves: { desayuno: [], comida: [], cena: [] },
    viernes: { desayuno: [], comida: [], cena: [] },
    sábado: { desayuno: [], comida: [], cena: [] },
    domingo: { desayuno: [], comida: [], cena: [] }
  };

  private tipoDiaSubject = new BehaviorSubject<string>('');
  tipoDia$ = this.tipoDiaSubject.asObservable();
  private tipoTiempoSubject = new BehaviorSubject<string>(''); // Añadido para tipo de comida
  tipoTiempo$ = this.tipoTiempoSubject.asObservable();
  private alimentosSeleccionadosSubject = new BehaviorSubject<any[]>([]);
  alimentosSeleccionados$ = this.alimentosSeleccionadosSubject.asObservable();

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorService,
    private facadeService: FacadeService
  ) {}

  obtenerAlimentosSeleccionados(tipoComida: string): any[] {
    const dia = this.getTipoDia();
    console.log(`Obteniendo alimentos para ${dia} - ${tipoComida}`);
    const alimentos = this.obtenerAlimentosPorDia(dia, tipoComida);
    console.log(`Alimentos obtenidos:`, alimentos);
    return alimentos;
  }
  
  actualizarAlimentosSeleccionados(tipoComida: string, alimentos: any[]): void {
    const dia = this.getTipoDia();
    console.log(`Actualizando alimentos para ${dia} - ${tipoComida}:`, alimentos);
    this.actualizarAlimentosPorDia(dia, tipoComida, alimentos);
    this.alimentosSeleccionadosSubject.next(alimentos);
  }
  
  obtenerComidas(): any[] {
    return Object.keys(this.alimentosPorDia.lunes).map(key => ({
      nombre: key,
      alimentos: []
    }));
  }

  actualizarAlimentosPorDia(dia: string, tipoComida: string, alimentos: any[]): void {
    if (this.alimentosPorDia[dia] && this.alimentosPorDia[dia][tipoComida]) {
      this.alimentosPorDia[dia][tipoComida] = alimentos;
      this.alimentosSeleccionadosSubject.next(alimentos);
      console.log(`Alimentos para ${dia} ${tipoComida} actualizados:`, alimentos);
    } else {
      console.error('Día o tipo de comida no reconocido:', dia, tipoComida);
    }
  }
  
  obtenerAlimentosPorDia(dia: string, tipoComida: string): any[] {
    console.log(`Obteniendo alimentos para ${dia} - ${tipoComida}`);
    console.log('Estructura actual de alimentosPorDia:', this.alimentosPorDia);
    return this.alimentosPorDia[dia] ? this.alimentosPorDia[dia][tipoComida] : [];
  }

  setTipoDia(dia: string) {
    this.tipoDiaSubject.next(dia);
  }

  getTipoDia(): string {
    return this.tipoDiaSubject.getValue();
  }

  setTipoTiempo(tipo: string) {
    this.tipoTiempoSubject.next(tipo);
  }

  getTipoTiempo(): string {
    return this.tipoTiempoSubject.getValue();
  }
}
