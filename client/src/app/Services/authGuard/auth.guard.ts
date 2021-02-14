import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    baseUrl = environment.baseUrl

    constructor(
        private http: HttpClient,
        private router: Router,
    ) { }

    canActivate(): Observable<boolean> {
        return this.http.get(`${this.baseUrl}user/isAuth`).pipe(
            map((res: any) => {
                if (res['Error']) {
                    this.router.navigateByUrl("/");
                    return false;
                } else {
                    return true;
                }
            }),
            catchError((err) => {
                this.router.navigateByUrl("/");
                return of(false);
            })
        );

    }


}