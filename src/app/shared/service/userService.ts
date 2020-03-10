
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
  api = this.url + '/api/users/';


  post(
    image: File,
    typeId: string,
    login: string,
    password: string,
    fullName: string,
    firstBalance: string,
    whoAdd: string,
    whoBottom: string
) {
  const body = {
    'image ': image,
    'typeId ' : typeId,
    'login ': login,
    'password ': password,
    'fullName ': fullName,
    'firstBalance ': firstBalance,
    'whoAdd ': whoAdd,
    'whoBottom ' : whoBottom
  };

  return this.http.post(this.api + 'create/' + localStorage.getItem('token'), body);
}

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

  update(
    id: string,
    image: File,
    typeId: string,
    login: string,
    password: string,
    fullName: string,
    firstBalance: string,
    whoAdd: string,
    whoBottom: string
    ) {
    const body = {
      'image ': image,
      'typeId ' : typeId,
      'login ': login,
      'password ': password,
      'fullName ': fullName,
      'firstBalance ': firstBalance,
      'whoAdd ': whoAdd,
      'whoBottom ' : whoBottom
    };

    return this.http.patch(this.api + id, body);
  }

  verify() {
    return this.http.get(this.api + 'verifyUser/' +  localStorage.getItem('token'));
  }

}
