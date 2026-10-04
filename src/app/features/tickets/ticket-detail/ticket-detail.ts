import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { httpResource, HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { toTicket, type TicketDto } from '../data/ticket-dto';
import type { Ticket } from '../../../domain/ticket';
import { ErrorPanel } from '../../../shared/ui/error-panel/error-panel';

@Component({
  selector: 'app-ticket-detail',
  imports: [RouterLink, DatePipe, ErrorPanel],
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketDetail {
  readonly id = input.required<string>();

  readonly #ticketResource = httpResource<Ticket>(() => `/api/tickets/${this.id()}`, {
    parse: (raw) => toTicket(raw as TicketDto),
  });

  readonly ticket = computed(() =>
    this.#ticketResource.hasValue() ? this.#ticketResource.value() : null,
  );
  readonly isLoading = this.#ticketResource.isLoading;

  readonly notFound = computed(() => {
    const err = this.#ticketResource.error();
    return err instanceof HttpErrorResponse && err.status === 404;
  });

  readonly errorMessage = computed(() => {
    if (!this.#ticketResource.error() || this.notFound()) return null;
    return "We couldn't load this ticket. Please try again.";
  });

  reload() {
    this.#ticketResource.reload();
  }
}
