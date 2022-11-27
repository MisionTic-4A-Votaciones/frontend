import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Personalized with ♥ by G02 C10 Mission TIC 2022 UNAL
    </span>
    <div class="socials">
      MISION TIC 2022
      <a href="#" target="https://github.com/MisionTic-4A-Votaciones/BeResultadosCurso10Grupo2" class="ion ion-social-github"></a>
    </div>
  `,
})
export class FooterComponent {
}
