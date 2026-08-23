import { AuditEventId, TicketId, UserId } from './ids';
import { TicketState } from './ticket';

interface AuditEventBase {
  id: AuditEventId;
  actorId: UserId;
  occuredAt: Date;
}

export type AuditEvent =
  | (AuditEventBase & { type: 'user.created'; userId: UserId })
  | (AuditEventBase & { type: 'user.suspended'; userId: UserId; reason: string })
  | (AuditEventBase & { type: 'ticket.created'; ticketId: TicketId })
  | (AuditEventBase & {
      type: 'ticket.status-changed';
      ticketId: TicketId;
      fromStatus: TicketState['status'];
      toStatus: TicketState['status'];
    });

export function describeAuditEvent(event: AuditEvent): string {
  switch (event.type) {
    case 'user.created':
      return `User ${event.userId} created.`;
    case 'user.suspended':
      return `User ${event.userId} suspended: ${event.reason}`;
    case 'ticket.created':
      return `Ticket ${event.ticketId} created.`;
    case 'ticket.status-changed':
      return `Ticket ${event.ticketId} moved from ${event.fromStatus} to ${event.toStatus}.`;
    default:
      return assertNever(event);
  }
}

function assertNever(x: never): never {
  throw new Error(`Unhandled variant: ${JSON.stringify(x)}`);
}
