import { Routes } from '@angular/router';

export const TICKETS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ticket-list-page/ticket-list-page').then((m) => m.TicketListPage),
  },
  {
    path: ':id',
    loadComponent: () => import('./ticket-detail/ticket-detail').then((m) => m.TicketDetail),
  },
];
