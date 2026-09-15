import { Injectable, signal } from '@angular/core';
import { Ticket } from '../../../domain/ticket';
import { MOCK_TICKETS } from './mock-tickets';

@Injectable({ providedIn: 'root' })
export class TicketStore {
  readonly #tickets = signal<Ticket[]>([...MOCK_TICKETS]);
  readonly tickets = this.#tickets.asReadonly();
}
