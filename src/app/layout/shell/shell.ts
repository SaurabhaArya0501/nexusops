import { Component, HostListener, signal, viewChild } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shell',
  imports: [Sidebar, Header, RouterOutlet],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  protected readonly sidebarCollapsed = signal(false);
  private readonly header = viewChild.required(Header);

  @HostListener('document:keydown./', ['$event'])
  onSlash(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    this.header().focusSearch();
  }
}
