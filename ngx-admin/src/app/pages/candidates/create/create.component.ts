import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidate } from '../../../models/candidate.model';
import { Party } from '../../../models/party.model';
import { CandidatesService } from '../../../services/candidates.service';
import { PartiesService } from '../../../services/parties.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

    creationMode: boolean = true;
    sendingAttemp: boolean = false;
    candidateId: string;
    parties: Party[];
    candidate: Candidate = {
      cedula: "",
      nombre: "",
      apellido:"",
      num_resolucion:"",
      party: {
        _id: "",
      }
    }
  
    constructor(private candidatesService: CandidatesService,
                private partiesService: PartiesService,
                private router: Router,
                private activatedRoute: ActivatedRoute) { }
  
    ngOnInit(): void {
      this.getParties();
      if(this.activatedRoute.snapshot.params.userId){
        this.creationMode = false;
        this.candidateId = this.activatedRoute.snapshot.params.candidateId;
        this.getUser(this.candidateId);
      }
      else
        this.creationMode = true;
    }
  
    getParties(): void{
      this.partiesService.list().subscribe(
        data => {
          this.parties = data;
        },
        error => {
          console.log(error);
        }
      );
    }
  
    getUser(id: string): void{
      this.candidatesService.getOne(id).subscribe(
        data => {
          this.candidate = data;
        },
        error => {
          console.log(error);
        }
      );
    }
  
    validateMandatoryData(): boolean {
      this.sendingAttemp = true;
      if(this.candidate.cedula=="" || this.candidate.nombre=="" || this.candidate.apellido=="" || this.candidate.num_resolucion=="" || this.candidate.party._id==null)
        return false;
      else
        return true;
    }
  
    create(): void {
      if(this.validateMandatoryData()){
        this.candidatesService.create(this.candidate).subscribe(
          data => {
            Swal.fire({
              title: 'Creado',
              text: 'El candidato se ha creado correctamente.',
              icon: 'success',
            });
            this.router.navigate(["pages/candidatos/listar"]);    
          },
          error => {
            console.log(error);
            Swal.fire({
              title: 'Falla en el servidor',
              text: 'El candidato no ha podido ser creado. Intente de nuevo mas tarde.',
              icon: 'error',
              timer: 5000
            })
          }
        )
      }
      else {
        Swal.fire({
          title: 'Campos obligatorios',
          text: 'Por favor diligencie todos los campos obligatorios.',
          icon: 'warning',
          timer: 5000
        })
      }
    }
  
    edit(): void{
      if(this.validateMandatoryData()){
        delete this.candidate._id
        let party_: Party = {
          _id: this.candidate.party._id,
        }
        this.candidate.party = party_;
        this.partiesService.edit(this.candidateId, this.candidate).subscribe(
          data => {
            Swal.fire(
              'Actualizado',
              'El usuario ha sido correctamente actualizado.',
              'success'
            );
            this.router.navigate(["pages/usuarios/listar"]);    
          },
          error => {
            console.log(error);
          }
        )
      }
      else {
        Swal.fire({
          title: 'Campos obligatorios',
          text: 'Por favor diligencie todos los campos obligatorios.',
          icon: 'warning',
          timer: 5000
        })
      }
    }
  }
