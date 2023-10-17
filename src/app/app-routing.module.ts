import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './purchaserequest/list.component';
import { ProductViewComponent } from './purchaserequest/view.component';
import { ProductAddEditComponent } from './purchaserequest/add-edit.component';

const routes: Routes = [
  { path: 'products', redirectTo: 'products/list', pathMatch: 'full' },
  { path: 'products/list', component: ProductListComponent },
  { path: 'products/:id/view', component: ProductViewComponent },
  { path: 'products/add', component: ProductAddEditComponent },
  { path: 'products/:id/edit', component: ProductAddEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
