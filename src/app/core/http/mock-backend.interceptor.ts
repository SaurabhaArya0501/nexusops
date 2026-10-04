import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, throwError, timer } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';
import { MOCK_TICKETS_DTOS } from '../../features/tickets/data/mock-tickets';

const LATENCY_MS = 800;
const SLOW_LATENCY_MS = 5000;

/** Dev switch: add ?mock=error, ?mock=empty or ?mock=slow to the page URL. */
function mockMode(): string | null {
  return new URLSearchParams(location.search).get('mock');
}

export const mockBackendInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method === 'GET' && req.url === '/api/tickets') {
    const mode = mockMode();

    if (mode === 'error') {
      return timer(LATENCY_MS).pipe(
        mergeMap(() =>
          throwError(
            () =>
              new HttpErrorResponse({
                status: 500,
                statusText: 'Internal Server Error',
                url: req.url,
              }),
          ),
        ),
      );
    }

    return of(
      new HttpResponse({ status: 200, body: mode === 'empty' ? [] : MOCK_TICKETS_DTOS }),
    ).pipe(delay(mode === 'slow' ? SLOW_LATENCY_MS : LATENCY_MS));
  }

  return next(req);
};
