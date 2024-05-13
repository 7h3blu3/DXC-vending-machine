import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CoinInsertComponent } from './components/coin-insert/coin-insert.component';
import { ProductInteractionComponent } from './components/product-interaction/product-interaction.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CoinInsertComponent,
    ProductInteractionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
