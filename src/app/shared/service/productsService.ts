import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import {url} from '../../url/url';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: Http) { }

  url = url.url;
  api = this.url + '/api/products/';

  getAll() {
    return this.http.get(  this.api + 'getall');
  }

  delete(id) {
    return this.http.delete(this.api + id + '/' + localStorage.getItem('token'));
  }

  post(
    nameUz: string,
    nameRu: string,
    nameEn: string,
    descriptionUz: string,
    descriptionRu: string,
    descriptionEn: string,
    image: string,
    categoryId: string,
    wareHouseId: string,
    quantity: string,  //miqdori
    configuration: string,
    price: string,
    rating: string
  ) {
    const Product = new FormData();
    Product.append('nameUz', nameUz);
    Product.append('nameRu', nameRu);
    Product.append('nameEn', nameEn);
    Product.append('descriptionUz', descriptionUz);
    Product.append('descriptionRu', descriptionRu);
    Product.append('descriptionEn', descriptionEn);
    Product.append('categoryId', categoryId);
    Product.append('wareHouseId', wareHouseId);
    Product.append('image', image);
    Product.append('quantity', quantity);
    Product.append('configuration', configuration);
    Product.append('price', price);
    Product.append('rating', rating);
    // return this.http.post(this.api + localStorage.getItem('token'), Product);
    return this.http.post(this.api + 'create/' + localStorage.getItem('token'), Product);

  }

  getProduct(id) {
    return this.http.get(this.api + 'getProduct/' + id );
  }

  getForMagazine() {
    return this.http.get(this.api + 'getForMagazine');
  }

  update(
    id: string,
    nameUz: string,
    nameRu: string,
    nameEn: string,
    descriptionUz: string,
    descriptionRu: string,
    descriptionEn: string,
    image: string,
    categoryId: string,
    wareHouseId: string,
    quantity: string,  //miqdori
    configuration: string,
    price: string,
    rating: string

 ) {
  const Product = new FormData();
  Product.append('nameUz', nameUz);
  Product.append('nameRu', nameRu);
  Product.append('nameEn', nameEn);
  Product.append('descriptionUz', descriptionUz);
  Product.append('descriptionRu', descriptionRu);
  Product.append('descriptionEn', descriptionEn);
  Product.append('categoryId', categoryId);
  Product.append('wareHouseId', wareHouseId);
  Product.append('image', image);
  Product.append('quantity', quantity);
  Product.append('configuration', configuration);
  Product.append('price', price);
  Product.append('rating', rating);
  return this.http.patch(this.api + 'updateProduct/' + id + '/' + localStorage.getItem('token'), Product);
 }

  updateQuantity(id, rate) {
    var body = {
      'quantity' : rate
    };
    return this.http.patch(this.api + 'updateQuanity/' + id, body);
  }

}
