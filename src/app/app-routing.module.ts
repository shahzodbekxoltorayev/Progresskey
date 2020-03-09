import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentStoresComponent } from './website/department-stores/department-stores.component';
import { NavbarComponent } from './website/navbar/navbar.component';
import { HomeComponent } from './website/home/home.component';
import { NewsComponent } from './website/news/news.component';
import { ProductComponent } from './website/product/product.component';
import { ProductAboutComponent } from './website/product-about/product-about.component';
import { NewsAboutComponent } from './website/news-about/news-about.component';
import { GalleryComponent } from './website/gallery/gallery.component';
import { ContactComponent } from './website/contact/contact.component';
import { AllProductComponent } from './website/all-product/all-product.component';
import { TopProductComponent } from './website/top-product/top-product.component';
import { PopularProductComponent } from './website/popular-product/popular-product.component';
import { NewProductComponent } from './website/new-product/new-product.component';
import { ManyProductComponent } from './website/many-product/many-product.component';


const routes: Routes = [

  { 
    path : '', component : NavbarComponent, children: [
      { path: '', component: HomeComponent} ,
      {path: 'department-stores' , component:DepartmentStoresComponent},
      {path: 'news' , component:NewsComponent},
      {path: 'product' , component:ProductComponent},
      {path: 'product-about' , component:ProductAboutComponent},
      {path: 'news-about' , component:NewsAboutComponent},
      {path: 'gallery' , component:GalleryComponent},
      {path: 'contact' , component:ContactComponent},
      {path: 'all-product' , component: AllProductComponent, children: [
        {path: '' , component: NewProductComponent} ,
        {path: 'top' , component: TopProductComponent} ,
        {path: 'popular' , component: PopularProductComponent} ,
        {path: 'many' , component: ManyProductComponent}
      ]} 
      
      ]
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
