import { Component, HostListener, signal, viewChild } from '@angular/core';
import { MOCK_TICKETS } from '../../data/mock-tickets';
import { TicketCard } from '../../features/tickets/ui/ticket-card/ticket-card';
import { TicketId } from '../../domain/ids';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';

@Component({
  selector: 'app-shell',
  imports: [TicketCard, Sidebar, Header],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  protected readonly tickets = MOCK_TICKETS;
  protected readonly sidebarCollapsed = signal(false);
  private readonly header = viewChild.required(Header);

  @HostListener('document:keydown./', ['$event'])
  onSlash(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    this.header().focusSearch();
  }

  protected onTicketSelected(id: TicketId): void {
    console.log('Selected ticket: ', id);
  }
}
