import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === 'GET') {
      if (request.url.includes('/orders')) {
        // add any headers you need
        request = request.clone({
          setHeaders: {}
        });
        // handle getOrders
        console.log('getOrders request intercepted', request);
      } else if (request.url.match(/\/orders\/\d+$/)) {
        // add any headers you need
        request = request.clone({
          setHeaders: {}
        });
        // handle getOrder
        console.log('getOrder request intercepted', request);
      } else if (request.url.includes('/products')) {
        // add any headers you need
        request = request.clone({
          setHeaders: {}
        });
        // handle getProducts
        console.log('getProducts request intercepted', request);
      }
    } else if (request.method === 'POST') {
      if (request.url.includes('/orders')) {
        // add any headers you need
        request = request.clone({
          setHeaders: {}
        });
        // handle addOrder
        console.log('addOrder request intercepted', request);
      }
    } else if (request.method === 'PUT') {
      if (request.url.match(/\/products\/\d+$/)) {
        // add any headers you need
        request = request.clone({
          setHeaders: {} 
        });
        // handle editProduct
        console.log('editProduct request intercepted', request);
      }
    }

    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            // handle response here
            console.log('HttpInterceptor Response', event);
          }
        },
        error => {
          // handle error here
          console.log('HttpInterceptor Error', error);
        }
      )
    );
  }
}
