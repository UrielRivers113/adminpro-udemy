import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos(){
    let url = URL_SERVICIOS+'/medico';
    return this.http.get(url)
    .map((resp: any)=>{
      this.totalMedicos = resp.total;
      return resp.medicos;
    });
  }

  cargarMedico(id: string){
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url)
    .map((resp:any)=>resp.medico);

  }

  buscarMedicos(termino: string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url)
    .map((resp:any)=> resp.medicos);
  }

  borrarMedico(id: string){
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
    .map(resp=>{
      Swal.fire('Médico borrado', 'El médico ha sido borrado correctamente', 'success');
      return resp;
    })
  }

  // Esta funcion va a actuar tanto para actualizar como crear
  guardarMedico(medico: Medico){
    let url = URL_SERVICIOS + '/medico';
    if(medico._id){
      // Si existe estamos actualizando
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;
      // Siempre tengo que notificar a la otra pantalla de que esto se hizo correctamente entonces:
      return this.http.put(url,medico)
      // Solo me va a interesar el medico, por eso solo .map
      .map((resp:any)=>{
        Swal.fire('Médico actualizado', medico.nombre, 'success');
        return resp.medico;
      });
    }else{
      // Si NO existe estamos creando
      url += '?token=' + this._usuarioService.token;
      // Si no pongo el return en medico.component.ts no va a aparecer la opcion de subscribe
      return this.http.post(url,medico)
      .map((resp:any)=>{
        Swal.fire('Médico creado', medico.nombre, 'success');
        return resp.medico;
      });
    }



  }

}
