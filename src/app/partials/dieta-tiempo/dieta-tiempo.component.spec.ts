import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DietaTiempoComponent } from './dieta-tiempo.component';
import { TiempoService } from 'src/services/tiempo.service';
import { MatRadioChange } from '@angular/material/radio';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { Router } from '@angular/router'; // Importa Router
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('DietaTiempoComponent', () => {
  let component: DietaTiempoComponent;
  let fixture: ComponentFixture<DietaTiempoComponent>;
  let tiempoServiceMock: any;

  beforeEach(async () => {
    // Crear un mock del servicio TiempoService
    tiempoServiceMock = {
      obtenerComidas: jasmine.createSpy('obtenerComidas').and.returnValue([]),
      alimentosSeleccionados$: of([]),
      obtenerAlimentosPorDia: jasmine.createSpy('obtenerAlimentosPorDia').and.returnValue([]),
      actualizarAlimentosPorDia: jasmine.createSpy('actualizarAlimentosPorDia'),
      setTipoDia: jasmine.createSpy('setTipoDia'),
      setTipoTiempo: jasmine.createSpy('setTipoTiempo')
    };

    // Configurar el módulo de pruebas
    await TestBed.configureTestingModule({
      declarations: [DietaTiempoComponent],
      imports: [RouterTestingModule, MatDialogModule],
      providers: [
        { provide: TiempoService, useValue: tiempoServiceMock },
        { provide: Location, useValue: { back: jasmine.createSpy('back') } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    // Crear la instancia del componente y el fixture
    fixture = TestBed.createComponent(DietaTiempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verificar que el componente se crea correctamente
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // Verificar que las comidas se inicializan en ngOnInit
  it('debería inicializar las comidas en ngOnInit', () => {
    component.ngOnInit();
    expect(component.comidas).toEqual(tiempoServiceMock.obtenerComidas());
  });

  // Verificar que las comidas se actualizan correctamente cuando cambia el día
  it('debería actualizar las comidas cuando cambie el día', () => {
    const dia = 'lunes';
    component.tipo_dia = '1';
    // Simular datos de comidas
    component.comidas = [{ nombre: 'desayuno', alimentos: [] }];
    component.updateComidas(dia);
    expect(tiempoServiceMock.obtenerAlimentosPorDia).toHaveBeenCalledWith(dia, 'desayuno');
  });
  

  // Verificar que la navegación ocurre correctamente cuando se selecciona una comida
  it('debería navegar a la página de proteínas cuando se selecciona una comida', () => {
    const router = TestBed.inject(Router); // Inyecta Router directamente
    spyOn(router, 'navigate');
    component.tipo_dia = '1';
    component.seleccionarComida('desayuno');
    expect(router.navigate).toHaveBeenCalledWith(['/proteinas']);
  });
});
