import { Component, OnInit } from '@angular/core';

export interface Contact {
  id: 0;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  isFavorite: true;
  info: {
    id: 0;
    company: string;
    avatar: string;
    address: string;
    phone: string;
    comments: string;
  };
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
