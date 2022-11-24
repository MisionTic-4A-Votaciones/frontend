import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { id } from '@swimlane/ngx-charts';
import Swal from 'sweetalert2';
import { Candidate } from '../../../models/candidate.model';
import { CandidatesService } from '../../../services/candidates.service';


@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  columnNames: string[] = ['Cédula', 'Nombres', 'Apellidos', 'Opciones'];
  candidates: Candidate[];

  constructor(private candidateService: CandidatesService, private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.candidateService.list().subscribe(
      data => {
        this.candidates = data
      },
      error => {
        console.log(error);
      }
    );
  }

  create() {
    this.router.navigate(["pages/candidatos/crear"]);
  }

  edit(){
    this.router.navigate(["pages/candidatos/actualizar"+id]);


  }

  delete(id: string): void {
    Swal.fire({
      title: 'Eliminar candidato',
      text: '¿Está seguro que desea eliminar al estudiante',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085DG',
      cancelButtonColor: '#D33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed){
        this.candidateService.delete(id).subscribe(
          data => {
            Swal.fire(
              '¡Eliminado',
              'El candidato ha sido eliminado correctamente',
              'success',

            )
          },
          error => {
            console.log(error);
          }
        )
      }
    })
  }
}
