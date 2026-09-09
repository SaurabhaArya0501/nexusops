import { Component } from '@angular/core';
import { MOCK_TICKETS } from '../../../data/mock-tickets';
import { TicketCard } from '../ui/ticket-card/ticket-card';
import { TicketId } from '../../../domain/ids';

@Component({
  selector: 'app-ticket-list-page',
  imports: [TicketCard],
  templateUrl: './ticket-list-page.html',
  styleUrl: './ticket-list-page.scss',
})
export class TicketListPage {
  protected readonly tickets = MOCK_TICKETS;

  protected onTicketSelected(id: TicketId): void {
    console.log('Selected ticket: ', id);
  }
}
