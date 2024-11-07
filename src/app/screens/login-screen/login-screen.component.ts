import { Component, OnInit } from '@angular/core';
import { NutriologoService } from 'src/services/nutriologo.service';
import { Router } from '@angular/router';
import { FacadeService } from 'src/services/facade.service';
declare var $: any;

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss'],
})
export class LoginScreenComponent implements OnInit {
  public username: string = '';
  public password: string = '';
  public type: string = 'password';
  public errors: any = {};

  constructor(
      private router: Router,
      private facadeService: FacadeService,
      private nustriologoService: NutriologoService,
  ) {}

  ngOnInit(): void {}

  userToken = {
    username: '',
    password: '',
  };


  public login() {
    console.log(this.userToken);
    console.log(this.username);
    console.log(this.password);

    this.userToken.username = this.username;
    this.userToken.password = this.password;

    console.log(this.userToken);
    this.nustriologoService.iniciarSesion(this.userToken).subscribe({
      next: (response) => {
        alert('Sesión Iniciada Correctamente');
        console.log(response);
        this.router.navigate(['/nutriologo-screen']);
      },
      error: (response) => {
        alert('¡Error!: No se Pudo Iniciar Sesión');
        console.log(response.error);
      },
    });
  }

  public registrar() {
    this.router.navigate(['registro-usuarios/nutriologo/']);
  }

  public showPassword() {
    if (this.type == 'password') {
      //Muestra la contraseña
      $('#show-password').addClass('show-password');
      $('#show-password').attr('data-password', true);
      this.type = 'text';
    } else if (this.type == 'text') {
      //Oculta la contraseña
      $('#show-password').removeClass('show-password');
      $('#show-password').attr('data-password', false);
      this.type = 'password';
    }
  }
}
