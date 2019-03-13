import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer,
  OnDestroy
} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Contact } from '../../interfaces/contact';
import { AppService } from 'src/app/services/app.service';
import { Observable, Subject, empty, Subscription } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { renderComponent } from '@angular/core/src/render3';
import { DialogService } from 'src/app/services/dialog.service';
import { listenOnPlayer } from '@angular/animations/browser/src/render/shared';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
  // error$ = new Subject<boolean>();
  // contacts$: Observable<Contact[]>;

  displayedColumns: string[] = [
    'select',
    'star',
    'name',
    'progress',
    'color',
    'favorite',
    'id',
    'delete'
  ];
  dataSource: MatTableDataSource<Contact>;
  selection = new SelectionModel<Contact>(true, []);
  array: Array<number> = [];
  subscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: AppService,
    private router: Router,
    private dialog: MatDialog,
    private dialogService: DialogService
    ) {
    // Assign the data to the data source for the table to render
  }

  ngOnInit() {
    this.render();
    this.listen();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  listen() {
    this.subscription = this.dialogService.emitt.subscribe(() => {
      this.render();
    });
  }

  render() {
    if (localStorage.getItem('bool') == 'false') {
      this.service.list().subscribe(e => {
        this.dataSource = new MatTableDataSource(e);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    } else {
      const arr: Array<Contact> = [];
      this.service.list().subscribe(e => {
        for (const d of e) {
          if (d.isFavorite) {
            arr.push(d);
          }
        }
        this.dataSource = new MatTableDataSource(arr);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.dataSource.data.forEach(row => {
        this.array.pop();
      });
    } else {
      this.dataSource.data.forEach(row => {
        this.selection.select(row);
        this.array.push(row.id);
      });
    }
  }

  starChange(e: any, row) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    console.log(row.isFavorite);
    if (row.isFavorite) {
      e.target.src = 'http://localhost:4200/assets/blankstar-icon.png';
      // // for encontra id, mudar o array local e muda o PUT
      for (const d of this.dataSource.filteredData) {
        if (d.id === row.id) {
          // console.log(d);
          this.service.update(d, false).subscribe();
        }
      }
      row.isFavorite = !row.isFavorite;
    } else {
      e.target.src = 'http://localhost:4200/assets/star-icon.png';
      for (const d of this.dataSource.filteredData) {
        if (d.id === row.id) {
          this.service.update(d, true).subscribe();
        }
      }
      row.isFavorite = !row.isFavorite;
    }
  }

  redirectToDelete = (id: string) => {
    this.dialogService.delDialog(this.dialog, id);
  }

  arrayRemove(arr, value) {
    return arr.filter((ele) => {
        return ele != value;
    });
 }

  changeArr(e: any, row) {
    if (e.checked) {
      this.array.push(row.id);
    } else {
      this.array = this.arrayRemove(this.array, row.id);
    }
  }

  delSelected() {
    if (this.array.length > 0) {
        this.dialogService.delSelectedDialog(this.dialog, this.array);
    } else {
      alert('No contacts selected');
    }
  }
}
