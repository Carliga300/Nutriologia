import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  private alimentosPorComida = {
    desayuno: [],
    comida: [],
    cena: []
  };
  private tipoDiaSubject = new BehaviorSubject<string>('');
  tipoDia$ = this.tipoDiaSubject.asObservable();
  private alimentosSeleccionadosSubject = new BehaviorSubject<any[]>([]);
  alimentosSeleccionados$ = this.alimentosSeleccionadosSubject.asObservable();

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorService,
    private facadeService: FacadeService
  ) { }

  obtenerAlimentosSeleccionados(tipoComida: string): any[] {
    return this.alimentosPorComida[tipoComida] || [];
  }

  actualizarAlimentosSeleccionados(tipoComida: string, alimentos: any[]): void {
    console.log(tipoComida,alimentos)
    if (this.alimentosPorComida[tipoComida]) {
      this.alimentosPorComida[tipoComida] = alimentos;
      this.alimentosSeleccionadosSubject.next(alimentos);
    } else {
      console.error('Tipo de comida no reconocido:', tipoComida);
    }
  }

  actualizarAlimentosPorComida(tipoComida: string, alimentos: any[]): void {
    if (this.alimentosPorComida[tipoComida]) {
      this.alimentosPorComida[tipoComida] = alimentos;
      console.log(`Alimentos para ${tipoComida} actualizados:`, alimentos);
    } else {
      console.error('Tipo de comida no reconocido:', tipoComida);
    }
  }

  setTipoTiempo(tipo: string) {
    this.tipoDiaSubject.next(tipo);
  }

  getTipoTiempo(): string {
    return this.tipoDiaSubject.getValue();
  }

  obtenerComidas(): any[] {
    return Object.keys(this.alimentosPorComida).map(key => ({
      nombre: key,
      alimentos: this.alimentosPorComida[key]
    }));
  }
}
