import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MOCK_TICKETS_DTOS } from '../../features/tickets/data/mock-tickets';

const LATENCY_MS = 800;

/** Dev-only fake server. Answers known URLs; everything else goes to the network. */
export const mockBackendInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method === 'GET' && req.url === '/api/tickets') {
    return of(new HttpResponse({ status: 200, body: MOCK_TICKETS_DTOS })).pipe(delay(LATENCY_MS));
  }
  return next(req);
};
