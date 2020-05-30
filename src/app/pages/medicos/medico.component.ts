import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
// ActivatedRoute Para leer la URL del medico que se envió

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params=>{
      let id = params['id'];
      if(id!=='nuevo'){
        this.cargarMedico(id);
      }
    }) 
    // esto es un observable al que me puedo suscribir

    // Es id porque en Pages routes pusimos -> path: 'medico/:id'
  }

  ngOnInit(){
    this._hospitalService.cargarHospitales()
    .subscribe(hospitales=>this.hospitales=hospitales)

    // Para subscribirme a la notificacion del modal
    this._modalUploadService.notificacion
    .subscribe(resp=>{
      // Esto es para que cuando cambie de imagen, en ese momento se visualice y no tenga que recargar
      this.medico.img = resp.medico.img;
    })



  }

  // Cargar un médico
  cargarMedico(id: string){
    // Para llamar función del servicio.
    this._medicoService.cargarMedico(id)
    .subscribe(medico=>{
      console.log(medico);
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });

  }

  guardarMedico(f: NgForm){
    console.log(f.valid);
    console.log(f.value);
    if(f.invalid){
      return;
    }
    this._medicoService.guardarMedico(this.medico)
    .subscribe(medico=>{
      this.medico._id = medico._id;
      this.router.navigate(['/medico',medico._id])
      //console.log(medico);
    }); 
  }

  cambioHospital(id: string){
    this._hospitalService.obtenerHospital(id)
    .subscribe(hospital=> this.hospital = hospital);
  }

  cambiarFoto(){
    this._modalUploadService.mostrarModal('medicos', this.medico._id)
    // Para recibir la información del modal debo subscribirme a su notificacion, lo hago en el ngoninit()

  }
}
