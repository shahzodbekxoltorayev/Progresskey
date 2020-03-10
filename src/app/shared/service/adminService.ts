
import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { Http } from '@angular/http';

import {url} from '../../url/url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: Http) { }

  url = url.url;
  api = this.url + '/api/admin/';

  getAll() {
    return this.http.get(this.api);
  }

  getId(id) {
    return this.http.get(this.api + id);
  }

  sign(body) {
    return this.http.post( this.api + 'sign', body);
  }

  delete(id) {
    return this.http.delete(this.api + id + '/' + localStorage.getItem('token'));
  }

  update(id, login, password) {
    const body = {
      'login ': login,
      'password ': password
    };
    return this.http.patch(this.api + id, body);
  }

  verify() {
    return this.http.get(this.api + 'verifyAdmin/' +  localStorage.getItem('token'));
  }

}
