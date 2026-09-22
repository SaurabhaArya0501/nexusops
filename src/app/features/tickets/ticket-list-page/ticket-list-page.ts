import { Component, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
  readonly #title = inject(Title);

  constructor() {
    effect(() => {
      this.#title.setTitle(`Tickets (${this.store.total()}) - NexusOps`);
    });
  }

  protected onTicketSelected(id: TicketId): void {
    console.log('Selected ticket: ', id);
  }
}
