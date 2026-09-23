import type { Ticket } from '../../../domain/ticket';

export type TicketSort = 'newest' | 'priority' | 'title';

const PRIORITY_ORDER: Record<Ticket['priority'], number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};

export function sortTickets(list: readonly Ticket[], sortBy: TicketSort): Ticket[] {
  const copy = [...list];

  switch (sortBy) {
    case 'priority':
      return copy.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
    case 'title':
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case 'newest':
      return copy.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}
