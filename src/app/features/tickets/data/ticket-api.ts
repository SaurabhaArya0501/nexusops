import type { Ticket } from '../../../domain/ticket';
import { MOCK_TICKETS_DTOS } from './mock-tickets';
import { toTicket } from './ticket-dto';

/** Simulated network latency, removed once a real backend exists. */
const LATENCY_MS = 800;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchTickets(): Promise<Ticket[]> {
  await delay(LATENCY_MS);
  return MOCK_TICKETS_DTOS.map(toTicket);
}
