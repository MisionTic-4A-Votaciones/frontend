import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidate } from '../../../models/candidate.model';
<<<<<<< HEAD
import { Party } from '../../../models/party.model';
import { CandidatesService } from '../../../services/candidates.service';
import { PartiesService } from '../../../services/parties.service';
=======
import { CandidatesService } from '../../../services/candidates.service';
>>>>>>> ab9db7cfdba1e94cf998641a68f57f8944b2140e

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

<<<<<<< HEAD
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
=======
  creationMode = true;  //true create and false is update
  candidateId: string = "";
  candidate: Candidate = {
    personal_id: "",
    name: "",
    lastname: "",
  }
  sendingAttemp: boolean = false;

  constructor(private candidateService: CandidatesService,
              private router: Router,
              private activatedRouted: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.activatedRouted.snapshot.params.candidateId){
      //update
      this.creationMode = false;
      this.candidateId = this.activatedRouted.snapshot.params.candidateId;
      this.getCandidate(this.candidateId);

    }
    else{
      //crear
      this.creationMode = true;
      

    }
  }

  getCandidate(id: string): void {
    this.candidateService.getOne(id).subscribe(
      data => {
        this.candidate = data;
      },
      error => {
        console.log(error);
      }
    )
  }
  
  validateMandatoryData(): boolean {
    this.sendingAttemp = true;
    if(this.candidate.personal_id=="" || this.candidate.name=="" || this.candidate.lastname=="" || this.candidate.resolution_id=="")
      return false;
    else
      return true;
  }

  create(): void {
    if(this.validateMandatoryData()){
      this.candidateService.create(this.candidate).subscribe(
        data => {
          Swal.fire({
            title:'Creado',
            text: 'El candidato ha sido creado correctamente',
            icon: 'success',
          });
          this.router.navigate(["pages/candidates/listar"])
        },
        error => {
          console.log(error)
          Swal.fire({
            title:'Falla en el servidor',
            text: 'El candidato no ha podido ser creado, por favor intente mas tarde',
            icon: 'error',
            timer: 5000

          })
        }
      )

    }
    else{
      Swal.fire({
        title:'Campos obligatorios',
        text:'Por favor diligencia los campos obligatorios',
        icon: 'warning',
        timer: 5000

      })
    }

  }

  edit(): void {
    if(this.validateMandatoryData()){
      let candidate_: Candidate = { ...this.candidate}
      delete candidate_._id
      this.candidateService.edit(this.candidate._id, candidate_).subscribe(
        data => {
          Swal.fire({
            title:'Actualizado',
            text: 'El candidato ha sido actualizado correctamente',
            icon: 'success',
          });
          this.router.navigate(["pages/candidates/listar"])
          
        },
        error => {
          console.log(error)
        }
      )
    }
    else{
      Swal.fire({
        title:'Campos obligatorios',
        text:'Por favor diligencia los campos obligatorios',
        icon: 'warning',
        timer: 5000

      })

    }

>>>>>>> ab9db7cfdba1e94cf998641a68f57f8944b2140e
  }
