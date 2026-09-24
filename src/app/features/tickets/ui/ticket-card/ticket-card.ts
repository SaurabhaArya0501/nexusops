import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Ticket } from '../../../../domain/ticket';

@Component({
  selector: 'app-ticket-card',
  imports: [RouterLink],
  templateUrl: './ticket-card.html',
  styleUrl: './ticket-card.scss',
})
export class TicketCard {
  ticket = input.required<Ticket>();
  readonly showStatus = input(true);

  protected readonly hasAssignee = computed(() => {
    const status = this.ticket().status;
    return status === 'assigned' || status === 'in-progress' || status === 'resolved';
  });
}
