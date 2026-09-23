import { Component, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TicketCard } from '../ui/ticket-card/ticket-card';
import { TicketId } from '../../../domain/ids';
import { TicketStore } from '../data/ticket-store';
import { Ticket } from '../../../domain/ticket';

@Component({
  selector: 'app-ticket-list-page',
  imports: [TicketCard],
  templateUrl: './ticket-list-page.html',
  styleUrl: './ticket-list-page.scss',
})
export class TicketListPage {
  readonly store = inject(TicketStore);
  readonly #title = inject(Title);
  readonly statusOptions: readonly (Ticket['status'] | 'all')[] = [
    'all',
    'open',
    'assigned',
    'in-progress',
    'resolved',
    'closed',
  ];

  constructor() {
    effect(() => {
      this.#title.setTitle(`Tickets (${this.store.total()}) - NexusOps`);
    });
  }

  protected onTicketSelected(id: TicketId): void {
    console.log('Selected ticket: ', id);
  }

  onQueryInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.store.setQuery(input.value);
  }
}
