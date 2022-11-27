import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Party } from '../../../models/party.model';
import { PartiesService } from '../../../services/parties.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true;
  sendingAttemp: boolean = false;
  partyId: string = "";
  party: Party = {
    nombre: "",
    lema: "",
  }

  constructor(private partiesService: PartiesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.partyId){
      this.creationMode = false;
      this.partyId = this.activatedRoute.snapshot.params.partyId;
      this.getParty(this.partyId);
    }
    else
      this.creationMode = true;
  }

  getParty(id: string): void {
    this.partiesService.getOne(id).subscribe(
      data => {
        this.party = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  validateMandatoryData(): boolean {
    this.sendingAttemp = true;
    if(this.party.nombre=="")
      return false;
    else
      return true;
  }

  create(): void{
    if(this.validateMandatoryData){
      this.partiesService.create(this.party).subscribe(
        data => {
          Swal.fire(
            'Creado',
            'El partido ha sido creado correctamente.',
            'success'
          );
          this.router.navigate(['pages/partidos/listar']);
        },
        error => {
          Swal.fire({
            title: 'Falla en el Servidor',
            text: 'El partido no ha podido ser creado. Intente de nuevo.',
            icon: 'error',
            timer: 5000
          });
        }
      )
    }
    else{
      Swal.fire({
        title: 'Campos Obligatorios',
        text: 'Por favor diligencie todos los campos obligatorios.',
        icon: 'warning',
        timer: 5000
      });
    }
  }

  edit(): void{
    if(this.validateMandatoryData){
      delete this.party._id;
      this.partiesService.edit(this.partyId, this.party).subscribe(
        data => {
          Swal.fire(
            'Actualizado',
            'El partido ha sido actualizado correctamente.',
            'success'
          );
          this.router.navigate(['pages/partidos/listar']);
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Falla en el Servidor',
            text: 'El partido no ha podido ser actualizado. Intente de nuevo.',
            icon: 'error',
            timer: 5000
          });
        }
      )
    }
    else{
      Swal.fire({
        title: 'Campos Obligatorios',
        text: 'Por favor diligencie todos los campos obligatorios.',
        icon: 'warning',
        timer: 5000
      });
    }
  }

}
