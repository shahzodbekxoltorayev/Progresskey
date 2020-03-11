import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { url } from '../../url/url';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: Http) { }

  url = url.url;
  api = this.url + '/api/userType/';

  getAll() {
    return this.http.get(this.api + 'getall');
  }

  getType(id) {
    return this.http.get( this.api + 'getType/' + id);
  }

  post(
    nameUz : string,
    nameRu : string,
    nameEn : string
  ) {
    const body = {
                  'nameUz ': nameUz,
                  'nameRu ': nameRu,
                  'nameEn ': nameEn
    };
    return this.http.post(this.api + localStorage.getItem('token'), body);
  }

  patch(
    id: string,
    nameUz : string,
    nameRu : string,
    nameEn : string
  ) {
    const body = {
                  'nameUz ': nameUz,
                  'nameRu ': nameRu,
                  'nameEn ': nameEn
    };
    return this.http.patch(this.api  + id + '/' + localStorage.getItem('token'), body);
  }

  delete(id) {
    return this.http.delete(this.api + id + '/' + localStorage.getItem('token'));
  }


}
