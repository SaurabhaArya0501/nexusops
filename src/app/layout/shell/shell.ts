import { Component } from '@angular/core';
import { MOCK_TICKETS } from '../../data/mock-tickets';
import { TicketCard } from '../../features/tickets/ui/ticket-card/ticket-card';
import { TicketId } from '../../domain/ids';

@Component({
  selector: 'app-shell',
  imports: [TicketCard],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  protected readonly tickets = MOCK_TICKETS;

  protected onTicketSelected(id: TicketId): void {
    console.log('Selected ticket: ', id);
  }
}
