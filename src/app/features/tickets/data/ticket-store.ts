import { Injectable, signal, linkedSignal, computed } from '@angular/core';
import { Ticket } from '../../../domain/ticket';
import { MOCK_TICKETS } from './mock-tickets';
import { sortTickets, type TicketSort } from './sort';

@Injectable({ providedIn: 'root' })
export class TicketStore {
  readonly #tickets = signal<Ticket[]>([...MOCK_TICKETS]);
  readonly tickets = this.#tickets.asReadonly();

  readonly counts = computed(() => {
    const acc: Record<Ticket['status'], number> = {
      open: 0,
      assigned: 0,
      'in-progress': 0,
      resolved: 0,
      closed: 0,
    };
    for (const t of this.#tickets()) {
      acc[t.status]++;
    }
    return acc;
  });

  readonly total = computed(() => this.#tickets().length);

  readonly #statusFilter = signal<Ticket['status'] | 'all'>('all');
  readonly #query = signal('');

  readonly statusFilter = this.#statusFilter.asReadonly();
  readonly query = this.#query.asReadonly();

  readonly visibleTickets = computed(() => {
    const status = this.#statusFilter();
    const q = this.#query().trim().toLowerCase();

    const filtered = this.#tickets().filter(
      (t) => (status === 'all' || t.status === status) && t.title.toLowerCase().includes(q),
    );

    return sortTickets(filtered, this.#sortBy());
  });

  readonly #sortBy = linkedSignal<TicketSort>(() => {
    this.#statusFilter();
    return 'newest';
  });
  readonly sortBy = this.#sortBy.asReadonly();

  setSortBy(sort: TicketSort) {
    this.#sortBy.set(sort);
  }

  setStatusFilter(status: Ticket['status'] | 'all') {
    this.#statusFilter.set(status);
  }

  setQuery(text: string) {
    this.#query.set(text);
  }

  clearFilters() {
    this.#statusFilter.set('all');
    this.#query.set('');
  }
}
