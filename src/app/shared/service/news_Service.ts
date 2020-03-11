import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import {url} from '../../url/url';

@Injectable({
  providedIn: 'root'
})
export class News_Service {

  constructor(private http: Http) { }

  url = url.url;
  api = this.url + '/api/news/';

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
    image: File,
  ) {
    const News = new FormData();
    News.append('nameUz', nameUz);
    News.append('nameRu', nameRu);
    News.append('nameEn', nameEn);
    News.append('descriptionUz', descriptionUz);
    News.append('descriptionUz', descriptionRu);
    News.append('descriptionUz', descriptionEn);
    News.append('image', image);
    // return this.http.post(this.api + localStorage.getItem('token'), Product);
    return this.http.post(this.api + 'create/' + localStorage.getItem('token'), News);

  }

  getNews(id) {
    return this.http.get(this.api + 'getNews/' + id );
  }

  getLimit() {
    return this.http.get( this.api + 'getLimit');
  }

 update(
    id: string,
    nameUz: string,
    nameRu: string,
    nameEn: string,
    descriptionUz: string,
    descriptionRu: string,
    descriptionEn: string,
    image: File,
  ) {
    const News = new FormData();
    News.append('nameUz', nameUz);
    News.append('nameRu', nameRu);
    News.append('nameEn', nameEn);
    News.append('descriptionUz', descriptionUz);
    News.append('descriptionUz', descriptionRu);
    News.append('descriptionUz', descriptionEn);
    News.append('image', image);
    return this.http.patch(this.api + 'updateNews/' + id + '/' + localStorage.getItem('token'), News);
 }

 updateRating(id) {
   return this.http.get(this.api + 'updateRaiting/' + id);
 }


}
