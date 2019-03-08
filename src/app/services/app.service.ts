import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { tap, delay, take, map } from 'rxjs/operators';
import { Contact } from '../interfaces/contact';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private readonly API = `${environment.API}`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Contact[]>(this.API);
  }

  getOne(id) {
    return this.http.get<Contact>(`${this.API}/${id}`).pipe(take(1));
  }

  update(d, aux) {
    return this.http.put(`${this.API}/${d.id}`, aux).pipe(take(1));
  }

  delete(id) {
    return this.http.delete<Contact>(`${this.API}/${id}`).pipe(take(1));
  }
}
