import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './website/navbar/navbar.component';
import { FooterComponent } from './website/footer/footer.component';
import { NewsComponent } from './website/news/news.component';
import { ProductComponent } from './website/product/product.component';
import { GalleryComponent } from './website/gallery/gallery.component';
import { ContactComponent } from './website/contact/contact.component';
import { DepartmentStoresComponent } from './website/department-stores/department-stores.component';
import { ProductAboutComponent } from './website/product-about/product-about.component';
import { HomeComponent } from './website/home/home.component';
import { NewsAboutComponent } from './website/news-about/news-about.component';
import { NewProductComponent } from './website/new-product/new-product.component';
import { TopProductComponent } from './website/top-product/top-product.component';
import { PopularProductComponent } from './website/popular-product/popular-product.component';
import { AllProductComponent } from './website/all-product/all-product.component';
import { ManyProductComponent } from './website/many-product/many-product.component'; 

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    NewsComponent,
    ProductComponent,
    GalleryComponent,
    ContactComponent,
    DepartmentStoresComponent,
    ProductAboutComponent,
    HomeComponent,
    NewsAboutComponent,
    NewProductComponent,
    TopProductComponent,
    PopularProductComponent,
    AllProductComponent,
    ManyProductComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
