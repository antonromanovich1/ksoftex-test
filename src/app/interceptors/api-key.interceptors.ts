import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  // could be injected as environment var or config service
  private readonly apiKey = 'fca_live_ah8anEFuc4PmmSgDK0B6ZdnzzGPmhc9fukijcCg7';

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Clone the request and add the API key header
    const modifiedRequest = request.clone({
      setHeaders: {
        apikey: this.apiKey,
      },
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedRequest);
  }
}
