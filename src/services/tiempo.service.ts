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

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorService,
    private facadeService: FacadeService
  ) { }

   // Inicializa un BehaviorSubject con un arreglo vacío
   private alimentosSeleccionadosSubject = new BehaviorSubject<any[]>([]);
   alimentosSeleccionados$ = this.alimentosSeleccionadosSubject.asObservable();

   // Método para actualizar los alimentos seleccionados
   actualizarAlimentosSeleccionados(alimentos: any[]) {
     this.alimentosSeleccionadosSubject.next(alimentos);
   }

}

