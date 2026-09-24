import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TicketStore } from '../data/ticket-store';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ticket-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.scss',
})
export class TicketDetail {
  readonly id = input.required<string>();
  readonly #store = inject(TicketStore);

  readonly ticket = computed(() => this.#store.tickets().find((t) => t.id === this.id()) ?? null);
}
