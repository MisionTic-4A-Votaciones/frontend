import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { id } from '@swimlane/ngx-charts';
import Swal from 'sweetalert2';
import { Party } from '../../../models/party.model';
import { PartiesService } from '../../../services/parties.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  columnNames: string[] = ['Nombre', 'Lema', 'Opciones'];
  parties: Party[];

  constructor(private partyService: PartiesService, private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    this.partyService.list().subscribe(
      data => {
        this.parties = data
      },
      error => {
        console.log(error);
      }
    );
  }

  create(): void{
    this.router.navigate(["pages/parties/crear"]);
  }

  edit(): void{
    this.router.navigate(["pages/parties/actualizar"+id]);


  }

  delete(id: string): void {
    Swal.fire({
      title: 'Eliminar partido politico',
      text: '¿Está seguro que desea eliminar el partido',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085DG',
      cancelButtonColor: '#D33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed){
        this.partyService.delete(id).subscribe(
          data => {
            Swal.fire(
              '¡Eliminado',
              'El partido ha sido eliminado correctamente',
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
