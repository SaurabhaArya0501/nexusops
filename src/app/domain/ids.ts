declare const brand: unique symbol;
export type Brand<T, B extends string> = T & { readonly [brand]: B };

export type UserId = Brand<string, 'UserId'>;
export type TicketId = Brand<string, 'TicketId'>;
export type AuditEventId = Brand<string, 'AuditEventId'>;

export const UserId = (v: string): UserId => v as UserId;
export const TicketId = (v: string): TicketId => v as TicketId;
export const AuditEventId = (v: string): AuditEventId => v as AuditEventId;