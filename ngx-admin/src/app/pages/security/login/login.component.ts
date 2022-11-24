import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../../models/user.model';
import { SecurityService } from '../../../services/security.service';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';

@Component({
  selector: 'ngx-login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private securityService: SecurityService, 
              private router: Router) { }

  ngOnInit(): void {
    console.log(`Email:${this.email} Password:${this.password}`);
    let user: User = {
      email: this.email,
      password: this.password,
    }
    this.securityService.validateLogin(user).subscribe(
      data => {
        this.securityService.saveSessionData(data);
      },
      error => {
        Swal.fire({
          title: "Error Login",
          text: error["error"]["message"],
          icon: "error",
          timer: 5000
        });
      }
      
    )
  }

}
