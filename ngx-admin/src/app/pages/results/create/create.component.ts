import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Result } from '../../../models/result.model';
import { ResultsService } from '../../../services/results.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true;
  sendingAttemp: boolean = false;
  resultId: string = "";
  result: Result = {
    name: "",
  }

  constructor(private resultsService: ResultsService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.resultId){
      this.creationMode = false;
      this.resultId = this.activatedRoute.snapshot.params.resultId;
      this.getParty(this.resultId);
    }
    else
      this.creationMode = true;
  }

  getParty(id: string): void {
    this.resultsService.getOne(id).subscribe(
      data => {
        this.result = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  validateMandatoryData(): boolean {
    this.sendingAttemp = true;
    if(this.result.name=="")
      return false;
    else
      return true;
  }

  create(): void{
    if(this.validateMandatoryData){
      this.resultsService.create(this.result).subscribe(
        data => {
          Swal.fire(
            'Creado',
            'El resultado ha sido creado correctamente.',
            'success'
          );
          this.router.navigate(['pages/resultados/listar']);
        },
        error => {
          Swal.fire({
            title: 'Falla en el Servidor',
            text: 'El resultado no ha podido ser creado. Intente de nuevo.',
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
      delete this.result._id;
      this.resultsService.edit(this.resultId, this.result).subscribe(
        data => {
          Swal.fire(
            'Actualizado',
            'El resultado ha sido actualizado correctamente.',
            'success'
          );
          this.router.navigate(['pages/partidos/listar']);
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Falla en el Servidor',
            text: 'El resultado no ha podido ser actualizado. Intente de nuevo.',
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
