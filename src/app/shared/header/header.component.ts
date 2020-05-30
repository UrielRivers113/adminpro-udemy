import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from 'src/app/models/usuario.models';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(public _usuarioService: UsuarioService,
              public router: Router) { }

  ngOnInit(){
    this.usuario = this._usuarioService.usuario;
  }

  buscar(termino: string){
    // Necesito redireccionar a la pantalla del buscador, por lo que necesito el router
    this.router.navigate(['/busqueda',termino]);

  }

}
