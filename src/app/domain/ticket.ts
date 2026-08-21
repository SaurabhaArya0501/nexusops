import { UserId, TicketId } from './ids';

export type TicketState =
  | { status: 'open'; openedAt: Date }
  | { status: 'assigned'; openedAt: Date; assignee: UserId }
  | { status: 'in-progress'; openedAt: Date; assignee: UserId; startedAt: Date }
  | { status: 'resolved'; openedAt: Date; assignee: UserId; resolvedAt: Date; resolution: string }
  | { status: 'closed'; openedAt: Date; closedAt: Date };

export interface TicketBase {
  id: TicketId;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdBy: UserId;
  createdAt: Date;
}

export type Ticket = TicketBase & TicketState;

export type TicketCreate = Pick<Ticket, 'title' | 'description' | 'priority'>;
export type TicketSummary = Pick<Ticket, 'id' | 'title' | 'description' | 'priority' | 'status'>;

export function describeTicket(state: TicketState): string {
  switch (state.status) {
    case 'open':
      return `Open since ${state.openedAt}`;
    case 'assigned':
      return `Assigned to ${state.assignee}`;
    case 'in-progress':
      return `Started on ${state.openedAt}, assigned to ${state.assignee}`;
    case 'resolved':
      return `Resolved: ${state.resolution}`;
    case 'closed':
      return `Closed on ${state.closedAt}`;
    default:
      return assertNever(state);
  }
}

function assertNever(x: never): never {
  throw new Error(`Unhandled variant: ${JSON.stringify(x)}`);
}
