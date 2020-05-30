import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from 'src/app/models/usuario.models';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  // Para mostrar  el resultado de busqueda HTML definimos 3 arreglos
  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];
  

  constructor(
    // Voy a necesitar lo que es poder recibir el parametro por el url, para eso defino lo siguiente:
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {
    activatedRoute.params
    .subscribe(params=>{
      // Quiero obtener el parametro que defini en mi router en "pages.routes" -> path:'busqueda/:termino'
      let termino = params['termino'];
      this.buscar(termino);
    })
   }

  ngOnInit(): void {
  }


  buscar(termino: string){
    // importemos en el constructor http para hacer peticiones  
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(url)
    .subscribe((resp:any)=>{
      console.log(resp);
      // Llamamos arriba en el activatedRoute.params esta funcion buscar();
      this.hospitales = resp.hospitales;
      this.medicos = resp.medicos;
      this.usuarios = resp.usuarios;


    });
    

  }

}
