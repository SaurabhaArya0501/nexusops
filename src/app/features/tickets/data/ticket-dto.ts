import type { Ticket } from '../../../domain/ticket';
import { TicketId, UserId } from '../../../domain/ids';

interface TicketBaseDto {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdBy: string;
  createdAt: string;
}

type TicketStateDto =
  | { status: 'open'; openedAt: string }
  | { status: 'assigned'; openedAt: string; assignee: string }
  | { status: 'in-progress'; openedAt: string; assignee: string; startedAt: string }
  | {
      status: 'resolved';
      openedAt: string;
      assignee: string;
      resolvedAt: string;
      resolution: string;
    }
  | { status: 'closed'; openedAt: string; closedAt: string };

export type TicketDto = TicketBaseDto & TicketStateDto;

export function toTicket(dto: TicketDto): Ticket {
  const base = {
    id: TicketId(dto.id),
    title: dto.title,
    description: dto.description,
    priority: dto.priority,
    createdBy: UserId(dto.createdBy),
    createdAt: new Date(dto.createdAt),
  };
  const openedAt = new Date(dto.openedAt);

  switch (dto.status) {
    case 'open':
      return { ...base, status: 'open', openedAt };
    case 'assigned':
      return { ...base, status: 'assigned', openedAt, assignee: UserId(dto.assignee) };
    case 'in-progress':
      return {
        ...base,
        status: 'in-progress',
        openedAt,
        assignee: UserId(dto.assignee),
        startedAt: new Date(dto.startedAt),
      };
    case 'resolved':
      return {
        ...base,
        status: 'resolved',
        openedAt,
        assignee: UserId(dto.assignee),
        resolvedAt: new Date(dto.resolvedAt),
        resolution: dto.resolution,
      };
    case 'closed':
      return { ...base, status: 'closed', openedAt, closedAt: new Date(dto.closedAt) };
  }
}
