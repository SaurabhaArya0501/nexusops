import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-panel',
  templateUrl: './error-panel.html',
  styleUrl: './error-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPanel {
  readonly message = input.required<string>();
  readonly retry = output<void>();
}
