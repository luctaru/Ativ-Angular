import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { CardComponent } from './components/card/card.component';
import { FormComponent } from './components/form/form.component';

const routes: Routes = [
  {path: '', component: TableComponent},
  {path: 'favorites', component: TableComponent},
  {path: 'contact/:id', component: CardComponent},
  {path: 'favorites/contact/:id', component: CardComponent},
  {path: 'add', component: FormComponent},
  {path: 'contact/:id/edit', component: FormComponent},
  {path: 'favorites/contact/:id/edit', component: FormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// path: 'contact/:id', component: CardComponent}
