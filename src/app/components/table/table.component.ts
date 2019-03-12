import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer,
  OnDestroy
} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Contact } from '../../interfaces/contact';
import { AppService } from 'src/app/services/app.service';
import { Observable, Subject, empty, Subscription } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { renderComponent } from '@angular/core/src/render3';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: AppService, private router: Router) {
    // Assign the data to the data source for the table to render
  }

  ngOnInit() {
    this.render();
  }

  ngOnDestroy() {
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
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
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

  public redirectToDelete = (id: string) => {
    this.service.delete(id).subscribe();
    this.router.navigate(['']);
  }
}
