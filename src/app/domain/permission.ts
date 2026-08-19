export type Resource = 'ticket' | 'user' | 'report' | 'audit' | 'settings';
export type Action = 'read' | 'create' | 'update' | 'delete';
export type Permission = `${Resource}:${Action}`;

export type RoleName = 'viewer' | 'agent' | 'manager' | 'admin';

export interface Role {
    name: RoleName;
    permissions: readonly Permission[];
}