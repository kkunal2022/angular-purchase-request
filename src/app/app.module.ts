import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MomentDateModule } from '@angular/material-moment-adapter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './purchaserequest/list.component';
import { ProductViewComponent } from './purchaserequest/view.component';
import { ProductAddEditComponent } from './purchaserequest/add-edit.component';
import { ProductService } from './_services/product.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductViewComponent,
    ProductAddEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatInputModule,
    MomentDateModule,
  ],
  providers: [ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
