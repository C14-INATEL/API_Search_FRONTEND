import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountInterface } from './accountInterface';
import { API_PATH } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
  export class AccountService {

  constructor(
    private http: HttpClient
  ) {}

  getByUserId(userId: number): Observable<AccountInterface[]> {
    return this.http.get<AccountInterface[]>(`${API_PATH}/accounts/user/${userId}`);
  }

  addMonitored(userId: number, email: string): Observable<string> {
    const encodedEmail = encodeURIComponent(email);
    return this.http.post(
      `${API_PATH}/accounts/accountMonitored/${userId}/${encodedEmail}`,
      {},
      { responseType: 'text' }
    ) as Observable<string>;
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${API_PATH}/accounts/${id}`);
  }

  deleteByEmail(email: string): Observable<void> {
    return this.http.delete<void>(`${API_PATH}/accounts/email/${email}`);
  }

  refreshEmail(userId: number, email: string): Observable<string> {
  const encodedEmail = encodeURIComponent(email);
  return this.http.put(
    `${API_PATH}/accounts/refresh/${userId}/${encodedEmail}`,
    {},
    { responseType: 'text' }
  ) as Observable<string>;
  }
}