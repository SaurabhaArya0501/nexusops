import { Component } from '@angular/core';
import { MOCK_TICKETS } from '../../data/mock-tickets';

@Component({
  selector: 'app-shell',
  imports: [],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  protected readonly tickets = MOCK_TICKETS;
}
