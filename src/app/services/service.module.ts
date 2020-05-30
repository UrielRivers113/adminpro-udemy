import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService,
  SidebarService, 
  SharedService, 
  UsuarioService,
  HospitalService, 
  LoginGuardGuard,
  SubirArchivoService,
  MedicoService
 } from './service.index';

import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers:[
    SettingsService,
    SidebarService, 
    SharedService,
    UsuarioService,
    HospitalService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService,
    MedicoService
  ],
  declarations: []
})
export class ServiceModule { }
