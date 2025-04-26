import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

export const apiKeyInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  // API key could come from environment or injected service
  const apiKey = 'fca_live_ah8anEFuc4PmmSgDK0B6ZdnzzGPmhc9fukijcCg7';

  // Clone the request and add the API key header
  const modifiedRequest = req.clone({
    setHeaders: {
      apikey: apiKey,
    },
  });

  // Pass the modified request to the next handler
  return next(modifiedRequest);
};
