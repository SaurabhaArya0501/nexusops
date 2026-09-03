/**
 * WEEK 1 PRACTICE — Generics, Utility Types & Mapped Types
 * ==========================================================
 * Hands-on exercises reconstructing TypeScript's built-in utility types
 * from scratch, to build real understanding of the mapped-type mechanics
 * underneath tools like Pick, Omit, and Readonly.
 *
 * Context: NexusOps — Week 1 (TypeScript Fundamentals)
 * These exercises are NOT part of the application (see /src/app/domain
 * for the real domain models this project builds on).
 */

import { UserId } from '../src/app/domain/ids.ts';
import { Resource } from '../src/app/domain/permission.ts';
import type { UserSummary } from '../src/app/domain/user.ts';

// ============================================================
// Exercise 1 — Reimplementing Pick, Omit, Readonly from scratch
// ============================================================
// GOAL: TypeScript's built-in utility types are just mapped types
// someone wrote once. Reconstructing them helps understand the
// underlying mechanism (keyof, indexed access, mapping modifiers).

type MyPick<T, K extends keyof T> = { [P in K]: T[P] };
type MyOmit<T, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] };
type MyReadOnly<T> = { readonly [P in keyof T]: T[P] };

// Verify
interface TestUser {
  id: string;
  name: string;
  age: number;
}

const testMyPick: MyPick<TestUser, 'id' | 'name'> = { id: '1', name: 'Sam' };
const testMyOmit: MyOmit<TestUser, 'name'> = { id: '2', age: 34 };
type testMyReadOnly = MyReadOnly<TestUser>;

// ============================================================
// Exercise 2 — DeepReadonly<T>
// ============================================================
// GOAL: Readonly<T> only protects the top level — nested objects
// stay mutable. This exercise introduces recursive types: a type
// that refers to itself to keep applying the same rule at every
// level of nesting.

type DeepReadOnly<T> = { readonly [P in keyof T]: T[P] extends object ? DeepReadOnly<T[P]> : T[P] };

// Verify
interface NestedExample {
  id: string;
  inner: { value: string; deep: { flag: boolean } };
}

const testDeepReadOnly: DeepReadOnly<NestedExample> = {
  id: '24',
  inner: {
    value: 'Hello',
    deep: {
      flag: false,
    },
  },
};
// testDeepReadOnly.inner.deep.flag = true;

// ============================================================
// Exercise 3 — pluckAll<T, K>
// ============================================================
// GOAL: extend the single-object `pluck<T, K>` pattern to
// work across an array — a realistic utility (e.g. "give me just
// the names from this list, for a dropdown").

function pluckAll<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item) => item[key]);
}

// Verify
const testUsers: UserSummary[] = [
  { id: UserId('u1'), name: 'Asha', role: 'employee' },
  { id: UserId('u2'), name: 'Ravi', role: 'resolver' },
];

const names = pluckAll(testUsers, 'name');

// ============================================================
// Exercise 4 — EventName template literal type
// ============================================================
// GOAL: apply the same template-literal pattern used for
// `Permission` (Resource:Action) to a different combination.

type EventVerb = 'created' | 'updated' | 'deleted';
type EventName = `${Resource}.${EventVerb}`;

// Verify
type Check4a = EventName;
