import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tickets' },
  {
    path: 'tickets',
    loadChildren: () => import('./features/tickets/tickets.routes').then((m) => m.TICKETS_ROUTES),
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
