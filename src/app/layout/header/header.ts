import { Component, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly searchBox = viewChild.required<ElementRef<HTMLInputElement>>('searchBox');

  focusSearch(): void {
    this.searchBox().nativeElement.focus();
  }
}
