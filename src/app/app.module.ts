import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CoinInsertComponent } from './components/coin-insert/coin-insert.component';
import { ProductInteractionComponent } from './components/product-interaction/product-interaction.component';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
    HttpClientModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
