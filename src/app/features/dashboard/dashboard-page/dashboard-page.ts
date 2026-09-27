import { Component, inject } from '@angular/core';
import { TicketStore } from '../../tickets/data/ticket-store';
import { Ticket } from '../../../domain/ticket';

@Component({
  selector: 'app-dashboard-page',
  imports: [],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  readonly store = inject(TicketStore);
  readonly statuses: readonly Ticket['status'][] = [
    'open',
    'assigned',
    'in-progress',
    'resolved',
    'closed',
  ] as const;
}
