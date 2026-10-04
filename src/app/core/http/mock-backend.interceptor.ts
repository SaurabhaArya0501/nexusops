import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, throwError, timer } from 'rxjs';
import { delay, mergeMap, finalize, map, tap } from 'rxjs/operators';
import { MOCK_TICKETS_DTOS } from '../../features/tickets/data/mock-tickets';

const LATENCY_MS = 800;
const SLOW_LATENCY_MS = 5000;

const TICKET_URL = /^\/api\/tickets\/([^/]+)$/;

/** Dev switch: add ?mock=error, ?mock=empty or ?mock=slow to the page URL. */
function mockMode(): string | null {
  return new URLSearchParams(location.search).get('mock');
}

/** Per-ticket latency, so request races are reproducible in dev. */
function latencyFor(id: string): number {
  if (mockMode() === 'slow') return SLOW_LATENCY_MS;
  return id.endsWith('1') ? 3000 : 300;
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

  // GET /api/tickets/:id: a single ticket
  const match = req.method === 'GET' ? TICKET_URL.exec(req.url) : null;
  const id = match?.[1];
  if (id) {
    const dto = MOCK_TICKETS_DTOS.find((t) => t.id === id);

    console.log('[mock] → start', id);

    if (!dto) {
      return timer(300).pipe(
        mergeMap(() =>
          throwError(
            () => new HttpErrorResponse({ status: 404, statusText: 'Not Found', url: req.url }),
          ),
        ),
      );
    }

    return timer(latencyFor(id)).pipe(
      map(() => new HttpResponse({ status: 200, body: dto })),
      tap({ unsubscribe: () => console.log('[mock] ✗ cancelled', id) }),
      finalize(() => console.log('[mock] ← done', id)),
    );
  }

  return next(req);
};
