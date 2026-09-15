import { Component, inject } from '@angular/core';
import { TicketCard } from '../ui/ticket-card/ticket-card';
import { TicketId } from '../../../domain/ids';
import { TicketStore } from '../data/ticket-store';

@Component({
  selector: 'app-ticket-list-page',
  imports: [TicketCard],
  templateUrl: './ticket-list-page.html',
  styleUrl: './ticket-list-page.scss',
})
export class TicketListPage {
  readonly store = inject(TicketStore);

  protected onTicketSelected(id: TicketId): void {
    console.log('Selected ticket: ', id);
  }
}
