import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { id } from '@swimlane/ngx-charts';
import Swal from 'sweetalert2';
import { Result } from '../../../models/result.model';
import { ResultsService } from '../../../services/results.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  columnNames: string[] = ['Votos', 'Mesa', 'Candidato', 'Opciones'];
  results: Result[];

  constructor(private resultService: ResultsService, private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    this.resultService.list().subscribe(
      data => {
        this.results = data
      },
      error => {
        console.log(error);
      }
    );
  }

  create(): void{
    this.router.navigate(["pages/results/crear"]);
  }

  edit(): void{
    this.router.navigate(["pages/results/actualizar"+id]);


  }

  delete(id: string): void {
    Swal.fire({
      title: 'Eliminar resultado',
      text: '¿Está seguro que desea eliminar el resultado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085DG',
      cancelButtonColor: '#D33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed){
        this.resultService.delete(id).subscribe(
          data => {
            Swal.fire(
              '¡Eliminado',
              'El resultado ha sido eliminado correctamente',
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
