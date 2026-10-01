import { Injectable, signal, linkedSignal, computed } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { toTicket, type TicketDto } from './ticket-dto';
import { Ticket } from '../../../domain/ticket';
import { sortTickets, type TicketSort } from './sort';

@Injectable({ providedIn: 'root' })
export class TicketStore {
  // State (private, writable)
  readonly #ticketsResource = httpResource<Ticket[]>(() => '/api/tickets', {
    parse: (raw) => (raw as TicketDto[]).map(toTicket),
  });
  readonly #tickets = computed(() =>
    this.#ticketsResource.hasValue() ? this.#ticketsResource.value() : [],
  );
  readonly #statusFilter = signal<Ticket['status'] | 'all'>('all');
  readonly #query = signal('');
  readonly #sortBy = linkedSignal<TicketSort>(() => {
    this.#statusFilter();
    return 'newest';
  });

  // Queries (public, read-only)
  readonly tickets = this.#tickets;
  readonly statusFilter = this.#statusFilter.asReadonly();
  readonly query = this.#query.asReadonly();
  readonly sortBy = this.#sortBy.asReadonly();
  readonly isLoading = this.#ticketsResource.isLoading;
  readonly error = this.#ticketsResource.error;

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
  readonly visibleTickets = computed(() => {
    const status = this.#statusFilter();
    const q = this.#query().trim().toLowerCase();

    const filtered = this.#tickets().filter(
      (t) => (status === 'all' || t.status === status) && t.title.toLowerCase().includes(q),
    );

    return sortTickets(filtered, this.#sortBy());
  });

  // Commands (public, change state)
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

  reload() {
    this.#ticketsResource.reload();
  }
}
