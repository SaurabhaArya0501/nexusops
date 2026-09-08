import { Component, model } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  collapsed = model(false);

  toggle(): void {
    this.collapsed.update((value) => !value);
  }
}
