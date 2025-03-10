import { Component, Input, OnInit } from '@angular/core';
import { PacienteService } from 'src/services/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/services/facade.service';
import { MatDialog } from '@angular/material/dialog';
import { EliminarUserModalComponent } from 'src/app/modals/eliminar-user-modal/eliminar-user-modal.component';


@Component({
  selector: 'app-nutriologo-screen',
  templateUrl: './nutriologo-screen.component.html',
  styleUrls: ['./nutriologo-screen.component.scss']
})
export class NutriologoScreenComponent implements OnInit {
  public tipo:string = "nutriologo-screen";
  public name_user:string = "";
  public lista_pacientes:any[]= [];

  // Arreglo de pacientes en formato JSON
  pacientes = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'María López' },
    { id: 3, nombre: 'Carlos García' },
    { id: 4, nombre: 'Ana Ramírez' },
    { id: 5, nombre: 'Luis Fernández' }
  ];

  constructor(
    public facadeService: FacadeService,
    private pacienteService: PacienteService,
    private router: Router,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    //this.name_user = this.facadeService.getUserCompleteName();
    //Lista de admins
    this.obtenerPacientes();
  }

  public obtenerPacientes() {
    this.pacienteService.obtenerListaPacientes().subscribe({
      next: (data: any[]) => {
        this.pacientes = data.map((item: any) => {
          return {
            id: item.id,
            nombre: `${item.user.first_name} ${item.user.last_name}`
          };
        });
        console.log("Lista de pacientes: ", this.pacientes);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  // funcion para redirigir a la pantalla de estadisticas
  public goEstadisticas(idUser: number){
    this.router.navigate(["estadisticas/"+idUser]);
  }


  //Funcion para editar
  public goEditar(idUser: number){
    this.router.navigate(["registro-usuarios/paciente/"+idUser]);
  }

  public delete(idUser: number){
    const dialogRef = this.dialog.open(EliminarUserModalComponent,{
      data: {id: idUser, rol: 'paciente'}, //Se pasan valores a través del componente
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Paciente eliminado");
        //Recargar página
        window.location.reload();
      }else{
        alert("Paciente no eliminado ");
        console.log("No se eliminó el paciente");
      }
    });

  }

  public goRegistrar(){
    this.router.navigate(["registro-usuarios/paciente/"]);
  }
}
