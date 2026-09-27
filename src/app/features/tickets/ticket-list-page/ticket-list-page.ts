import { Component, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TicketCard } from '../ui/ticket-card/ticket-card';
import { TicketStore } from '../data/ticket-store';
import { Ticket } from '../../../domain/ticket';
import { TicketSort } from '../data/sort';

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
  readonly sortOptions: readonly TicketSort[] = ['newest', 'priority', 'title'];

  constructor() {
    effect(() => {
      this.#title.setTitle(`Tickets (${this.store.total()}) - NexusOps`);
    });
  }

  onQueryInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.store.setQuery(input.value);
  }

  onSortChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.store.setSortBy(select.value as TicketSort);
  }
}
