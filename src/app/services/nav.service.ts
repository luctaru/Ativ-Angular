import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  getLinks() {
    return ['All', 'Favorites', 'Add'];
  }

  constructor() { }
}
