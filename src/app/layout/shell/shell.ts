import { Component, signal } from '@angular/core';
import { MOCK_TICKETS } from '../../data/mock-tickets';
import { TicketCard } from '../../features/tickets/ui/ticket-card/ticket-card';
import { TicketId } from '../../domain/ids';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-shell',
  imports: [TicketCard, Sidebar],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  protected readonly tickets = MOCK_TICKETS;
  protected readonly sidebarCollapsed = signal(false);

  protected onTicketSelected(id: TicketId): void {
    console.log('Selected ticket: ', id);
  }
}
