import { TicketDto } from './ticket-dto';

export const MOCK_TICKETS_DTOS: readonly TicketDto[] = [
  {
    id: 'TCK-1001',
    title: 'VPN disconnects every 10 minutes on WFH days',
    description:
      'Since the firmware update on the office router, my VPN client drops the tunnel roughly every 10 minutes when working from home. Reconnecting works but is disruptive during calls.',
    priority: 'high',
    createdBy: 'USR-2044',
    createdAt: '2026-09-01T08:12:00Z',
    status: 'open',
    openedAt: '2026-09-01T08:12:00Z',
  },
  {
    id: 'TCK-1002',
    title: 'Access request: Finance shared drive for new hire',
    description:
      'New hire Priya Nair (starts Monday) needs read/write access to the Finance shared drive under Q3 Reporting. Manager approval attached in email thread.',
    priority: 'medium',
    createdBy: 'USR-2098',
    createdAt: '2026-09-02T05:40:00Z',
    status: 'assigned',
    openedAt: '2026-09-02T05:40:00Z',
    assignee: 'USR-3011',
  },
  {
    id: 'TCK-1003',
    title: 'Laptop fan running at full speed constantly',
    description:
      'Company laptop (asset tag MC-4471) fan runs at maximum speed even during light usage like email and Slack. Suspect dust buildup or a stuck sensor.',
    priority: 'low',
    createdBy: 'USR-2151',
    createdAt: '2026-08-29T11:05:00Z',
    status: 'in-progress',
    openedAt: '2026-08-29T11:05:00Z',
    assignee: 'USR-3011',
    startedAt: '2026-08-30T09:00:00Z',
  },
  {
    id: 'TCK-1004',
    title: 'Production deployment pipeline failing on staging merge',
    description:
      'CI pipeline fails at the "deploy-staging" step with a timeout error. Started after yesterday\'s Jenkins agent upgrade. Blocking the release team.',
    priority: 'critical',
    createdBy: 'USR-2077',
    createdAt: '2026-08-25T14:22:00Z',
    status: 'resolved',
    openedAt: '2026-08-25T14:22:00Z',
    assignee: 'USR-3029',
    resolvedAt: '2026-08-25T18:47:00Z',
    resolution:
      'Jenkins agent had a stale Docker credential cache. Cleared cache and re-authenticated the agent; pipeline confirmed green on retry.',
  },
  {
    id: 'TCK-1005',
    title: 'Monitor flickering intermittently — conference room 4B',
    description:
      'The wall-mounted display in conference room 4B flickers intermittently during video calls, most noticeable during screen share. Reported by three separate teams this week.',
    priority: 'medium',
    createdBy: 'USR-2033',
    createdAt: '2026-08-20T09:15:00Z',
    status: 'closed',
    openedAt: '2026-08-20T09:15:00Z',
    closedAt: '2026-08-22T16:30:00Z',
  },
  {
    id: 'TCK-1006',
    title: 'Password reset email not arriving',
    description:
      'Requested a password reset via the self-service portal three times over the last hour. No email received in inbox or spam folder.',
    priority: 'high',
    createdBy: 'USR-2162',
    createdAt: '2026-09-03T07:50:00Z',
    status: 'open',
    openedAt: '2026-09-03T07:50:00Z',
  },
  {
    id: 'TCK-1007',
    title: 'Request: add "Contractor" as a badge access category',
    description:
      'Facilities wants a distinct badge-access category for short-term contractors, separate from full-time employees, with automatic expiry after 90 days.',
    priority: 'low',
    createdBy: 'USR-2201',
    createdAt: '2026-08-18T12:00:00Z',
    status: 'assigned',
    openedAt: '2026-08-18T12:00:00Z',
    assignee: 'USR-3044',
  },
];
