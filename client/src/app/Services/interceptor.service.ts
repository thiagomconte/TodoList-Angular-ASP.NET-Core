import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { logoutUser } from '../Store/Actions/auth.actions';

@Injectable({
    providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {
    constructor(private router: Router, private store: Store) { };

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token = JSON.parse(localStorage.getItem('auth') || '{}');

        if (token) {
            request = request.clone({ setHeaders: { 'Authorization': 'Bearer ' + token.token } });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ setHeaders: { 'Content-Type': 'application/json' } });
        }

        request = request.clone({ setHeaders: { 'Accept': 'application/json' } });

        return next.handle(request).pipe(
            tap({
              error: (res) => {    
                if(res.status === 401){
                  this.store.dispatch(logoutUser()); 
                }
              }
            })
          );
    }

}
