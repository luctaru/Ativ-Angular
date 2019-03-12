import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { tap, delay, take, map } from "rxjs/operators";
import { Contact } from "../interfaces/contact";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
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

  update(d, bool) {
    const body = {
      firstName: d.firstName,
      lastName: d.lastName,
      email: d.email,
      gender: d.gender,
      isFavorite: bool,
      company: d.info.company,
      avatar: d.info.avatar,
      address: d.info.address,
      phone: d.info.phone,
      comments: d.info.comments
    };
    return this.http.put(`${this.API}/${d.id}`, body).pipe(take(1));
  }

  insert(d) {
    const body = {
      firstName: d.firstName,
      lastName: d.lastName,
      email: d.email,
      gender: d.gender,
      isFavorite: d.isFavorite,
      company: d.info.company,
      avatar: d.info.avatar,
      address: d.info.address,
      phone: d.info.phone,
      comments: d.info.comments
    };
    return this.http.post(`${this.API}`, body).pipe(take(1));
  }

  delete(id) {
    return this.http.delete<Contact>(`${this.API}/${id}`).pipe(take(1));
  }
}
