import { describe, expect, it } from 'vitest';
import { toTicket, type TicketDto } from './ticket-dto';

const resolvedDto: TicketDto = {
  id: 'TCK-1',
  title: 't',
  description: 'd',
  priority: 'high',
  createdBy: 'USR-1',
  createdAt: '2026-08-25T14:22:00.000Z',
  status: 'resolved',
  openedAt: '2026-08-25T14:22:00.000Z',
  assignee: 'USR-2',
  resolvedAt: '2026-08-25T18:47:00.000Z',
  resolution: 'fixed',
};

describe('toTicket', () => {
  it('turns date strings into real Dates', () => {
    const t = toTicket(resolvedDto);
    expect(t.createdAt).toBeInstanceOf(Date);
    expect(t.createdAt.toISOString()).toBe(resolvedDto.createdAt);
  });

  it('keeps variant-specific fields', () => {
    const t = toTicket(resolvedDto);
    if (t.status !== 'resolved') throw new Error('wrong variant');
    expect(t.resolvedAt.getTime()).toBe(Date.parse(resolvedDto.resolvedAt));
  });
});
