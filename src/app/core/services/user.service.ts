import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../models/userData';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';
  private _refresh = signal(0);
  private _search = signal('');

  search$ = this._search.asReadonly();
  refresh$ = this._refresh.asReadonly();

  notifyRefresh() {
    this._refresh.update(v => v + 1);
  }

  setSearch(value: string) {
    this._search.set(value);
  }

  getUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(`${this.apiUrl}/users`);
  }

  getUserById(id: string): Observable<UserData> {
    return this.http.get<UserData>(`${this.apiUrl}/users/${id}`);
  }

  postNewUser(data: UserData): Observable<UserData> {
    return this.http.post<UserData>(`${this.apiUrl}/users`, data);
  }

  updateUser(user: UserData): Observable<UserData> {
   return this.http.put<UserData>(`${this.apiUrl}/users/${user.id}`, user);
  }

  deleteUser(id: string): Observable<UserData> {
    return this.http.delete<UserData>(`${this.apiUrl}/users/${id}`);
  }
}
