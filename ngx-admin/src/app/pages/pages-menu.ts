import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Inicio',
    icon: 'home',
    link: '/pages',
    home: true,
  },
  
  {
    title: 'Autentificación',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/pages/seguridad/login',
      },
      {
        title: 'Reset Password',
        link: '/pages/users/crear',
      },
    ],
  },
  {
    title: 'Candidatos',
    icon: 'archive',
    link: '/pages/candidatos/listar',
  },
  
  {
    title: 'Mesas',
    icon: 'clipboard',
    link: '/pages/mesas/listar',
  },
  {
    title: 'Patidos Politicos',
    icon: 'flag',
    link: '/pages/partidos/listar',
  },
      
  {
    title: 'Resultados',
    icon: 'edit-2-outline',
    link: '/pages/resultados/listar',
  },
  {
    title: 'Reportes',
    icon: 'edit-2-outline',
    link: '/pages/reportes/listar',
  },
  
];
