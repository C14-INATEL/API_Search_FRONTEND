import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { userInterface as I_User, userInterface } from './userInterface';
import { API_PATH } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpclient: HttpClient){  
  }

  login(email: string, password: string): Observable<number> {
    const emailEncod = encodeURIComponent(email);
    const passwordEncod = encodeURIComponent(password);
  return this.httpclient.get<number>(`${API_PATH}/users/login/${emailEncod}/${passwordEncod}`);
  }
  errorMessage: string = '';

  saveUser(user: userInterface): Observable<userInterface> {
    return this.httpclient
      .post<userInterface>(`${API_PATH}/users/save`, user)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  private errorHandler(error: HttpErrorResponse) {

    let message = '';

    if (error.error instanceof ErrorEvent) {
      message = `Error: ${error.error.message}`;
    } else {
      message = `Error ${error.status}: ${error.error?.message || error.message || 'Server error'}`;
    }
    
    return throwError(() => new Error(message));
  }
}
