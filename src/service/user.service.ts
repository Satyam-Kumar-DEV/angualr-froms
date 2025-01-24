import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:4093/users/';

  constructor(private http: HttpClient) {}

  createUser(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${'addUser'}`, formData);
  }

  updateUser(formData: FormData, id: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${'updateUser'}/${id}`, formData);
  }

  getUsers(page: number, limit: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}${'getUser'}?page=${page}&limit=${limit}`
    );
  }

  getUserById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${'getUserById'}/${id}`);
  }
}
