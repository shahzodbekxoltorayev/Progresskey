import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { url } from '../../url/url';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: Http) { }

  url = url.url;
  api = this.url + '/api/category/';

  getAll() {
    return this.http.get(this.api + 'getall');
  }

  delete(id) {
    return this.http.delete(this.api + id + '/' + localStorage.getItem('token'));
  }

  post(
    nameUz: string,
    nameRu: string,
    nameEn: string
  ) {
    const body = {
      'nameUz ': nameUz,
      'nameRu ': nameRu,
      'nameEn ': nameEn
    };
    return this.http.post(this.api + localStorage.getItem('token'), body);
  }

  getCategory(id) {
    return this.http.get(this.api + 'getCategory/' + id);
  }

  update(
    id: string,
    nameUz: string,
    nameRu: string,
    nameEn: string
  ) {
    const body = {
      'nameUz ': nameUz,
      'nameRu ': nameRu,
      'nameEn ': nameEn
    };

    return this.http.patch(this.api + 'updateCategory/' + id + '/' + localStorage.getItem('token'), body);
  }



}
