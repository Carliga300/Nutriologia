import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorService } from './tools/error.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FacadeService } from './facade.service';
import { BehaviorSubject } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TiempoService {
  private comidas: any[] = [
    {value: '1', nombre: 'Desayuno', alimentos: []},
    {value: '2', nombre: 'Comida', alimentos: []},
    {value: '3', nombre: 'Cena', alimentos: []},
  ];
  private tipoDiaSubject = new BehaviorSubject<string>('');
  tipoDia$ = this.tipoDiaSubject.asObservable();
  private alimentosSeleccionados = new BehaviorSubject<any[]>([]); // Usamos BehaviorSubject para almacenar los alimentos seleccionados
  alimentosSeleccionados$ = this.alimentosSeleccionados.asObservable();

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorService,
    private facadeService: FacadeService
  ) { }

  // Método para obtener las comidas
  obtenerComidas(): any[] {
    return this.comidas;
  }

  // Método para actualizar el arreglo
  actualizarAlimentosSeleccionados(alimentos: any[]) {
    this.alimentosSeleccionados.next(alimentos);
  }

  obtenerAlimentosSeleccionados(): any[] {
    return this.alimentosSeleccionados.getValue();
  }

  // Método para actualizar los alimentos por tipo de comida
  actualizarAlimentosPorComida(tipoComida: string, alimentos: any[]) {
    // Buscar si ya existe el tipo de comida en la lista
    const comida = this.comidas.find(c => c.comida === tipoComida);

    if (comida) {
      // Si ya existe, actualizamos los alimentos
      comida.alimentos = alimentos;
    } else {
      // Si no existe, agregamos una nueva entrada
      this.comidas.push({ comida: tipoComida, alimentos: alimentos });
    }

    // Para ver las comidas actualizadas en la consola
    console.log(`Comidas actualizadas:`, this.comidas);
  }

  setTipoDia(tipo: string) {
    this.tipoDiaSubject.next(tipo);
  }

  getTipoDia(): string {
    return this.tipoDiaSubject.getValue();
  }

}

//aaaaaasaas
