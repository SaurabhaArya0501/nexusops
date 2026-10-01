import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import type { Ticket } from '../../../domain/ticket';
import { toTicket, type TicketDto } from './ticket-dto';

@Injectable({ providedIn: 'root' })
export class TicketApi {
  readonly #http = inject(HttpClient);

  async fetchTickets(): Promise<Ticket[]> {
    const dtos = await firstValueFrom(this.#http.get<TicketDto[]>('/api/tickets'));
    return dtos.map(toTicket);
  }
}
