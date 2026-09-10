import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tickets' },
  {
    path: 'tickets',
    loadComponent: () =>
      import('./features/tickets/ticket-list-page/ticket-list-page').then((m) => m.TicketListPage),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard-page/dashboard-page').then((m) => m.DashboardPage),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found-page/not-found-page').then((m) => m.NotFoundPage),
  },
];
