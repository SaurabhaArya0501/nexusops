import { Component, computed, input, output } from '@angular/core';
import { Ticket } from '../../../../domain/ticket';
import { TicketId } from '../../../../domain/ids';

@Component({
  selector: 'app-ticket-card',
  imports: [],
  templateUrl: './ticket-card.html',
  styleUrl: './ticket-card.scss',
})
export class TicketCard {
  ticket = input.required<Ticket>();
  selected = output<TicketId>();

  protected readonly hasAssignee = computed(() => {
    const status = this.ticket().status;
    return status === 'assigned' || status === 'in-progress' || status === 'resolved';
  });

  protected onSelect(): void {
    this.selected.emit(this.ticket().id);
  }
}
