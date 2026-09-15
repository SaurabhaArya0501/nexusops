import { Injectable, signal, computed } from '@angular/core';
import { Ticket } from '../../../domain/ticket';
import { MOCK_TICKETS } from './mock-tickets';

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
}
