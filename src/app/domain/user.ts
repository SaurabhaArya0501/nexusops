import { UserId } from "./ids";
import { RoleName } from "./permission";

export type UserStatus = 
    { kind: 'active'; lastLoginAt: Date | null }
    | { kind: 'invited'; invitedAt: Date; invitedBy: UserId }
    | { kind: 'suspended'; suspendedAt: Date; reason: string }
    | { kind: 'deactivated'; deactivatedAt: Date };

export interface User {
    readonly id: UserId;
    name: string;
    email: string;
    role: RoleName;
    status: UserStatus;
    readonly createdAt: Date;
}

export type UserCreate = Pick<User, 'name' | 'email' | 'role'>;
export type UserUpdate = Partial<Pick<User, 'name' | 'email' | 'role'>>;
export type UserSummary = Pick<User, 'id' | 'name' | 'role'>;