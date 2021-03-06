import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { Subscription } from 'rxjs';
import { TableComponent } from '../table/table.component';
import { Location } from '@angular/common';
import { DialogService } from 'src/app/services/dialog.service';
import { MatDialog } from '@angular/material';


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
  image: string;
  sub: Subscription;
  sub2: Subscription;
  aux: Contact;
  // tab: TableComponent;

  constructor(
    private route: ActivatedRoute,
    private service: AppService,
    private location: Location,
    private router: Router,
    private dialogService: DialogService,
    private dialog: MatDialog
    ) {
      this.sub = this.route.params.subscribe(
        (params: any) => {
          this.id = params.id;
      });

      this.service.getOne(this.id).subscribe(d => {
        this.aux = d;
        this.image = d.info.avatar;
      });
    }

  ngOnInit() {
    this.eventRedirect();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

  eventRedirect() {
    this.sub2 = this.dialogService.emitt.subscribe(() => this.router.navigate(['']));
  }

  delContact() {
    this.dialogService.delDialog(this.dialog, this.id);
  }

}
