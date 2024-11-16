import { Component, Input, OnInit } from '@angular/core';
import { PorcionService } from 'src/services/porcion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/services/facade.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditarUserModalComponent } from 'src/app/modals/editar-user-modal/editar-user-modal.component';

//Para poder usar jquery definir esto
declare var $:any;

@Component({
  selector: 'app-dieta-porcion',
  templateUrl: './dieta-porcion.component.html',
  styleUrls: ['./dieta-porcion.component.scss']
})
export class DietaPorcionComponent implements OnInit{
  @Input() rol: string = "";
  @Input() datos_user: any = {};

  public porcion:any= {};
  public token: string = "";
  public errors:any={};
  public editar:boolean = false;
  public idUser: Number = 0;

  constructor(
    private location : Location,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private porcionService: PorcionService,
    private facadeService: FacadeService,
    public dialog: MatDialog


  ){}

  ngOnInit(): void {
  }


}
