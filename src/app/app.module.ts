import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 

import {
  MatSliderModule ,
  MatInputModule,
  MatButtonModule ,
  MatIconModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule 
}  from '@angular/material';

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
import { UserComponent } from './user/user/user.component';
import { UserTeamComponent } from './user/user-team/user-team.component';
import { TransferComponent } from './user/transfer/transfer.component';
import { UserSettingComponent } from './user/user-setting/user-setting.component';
import { UserResultComponent } from './user/user-result/user-result.component';
import { UserInformationComponent } from './user/user-information/user-information.component';
import { UserNotesComponent } from './user/user-notes/user-notes.component';
import { UserHomeComponent } from './user/user-home/user-home.component'; 

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
    ManyProductComponent,
    UserComponent,
    UserTeamComponent,
    TransferComponent,
    UserSettingComponent,
    UserResultComponent,
    UserInformationComponent,
    UserNotesComponent,
    UserHomeComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
