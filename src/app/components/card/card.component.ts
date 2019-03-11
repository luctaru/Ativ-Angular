import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { Subscription } from 'rxjs';
import { TableComponent } from '../table/table.component';


export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  isFavorite: true;
  info: {
    id: number;
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

export class CardComponent implements OnInit, OnDestroy {

  id: number;
  img: string;
  sub: Subscription;
  aux: Contact;
  // tab: TableComponent;

  constructor(private route: ActivatedRoute, private service: AppService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      (params: any) => {
        this.id = params.id;
    });

    this.service.getOne(this.id).subscribe(d => {this.aux = d; this.img = d.info.avatar; console.log(this.img); });

    console.log(this.img);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  delContact() {
    this.service.delete(this.id).subscribe();
    // this.tab.render();
  }
}
