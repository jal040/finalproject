import { Injectable } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http'; 
// import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
    
  constructor( private http: HttpClient ) { }
  
  url: string = 'http://summer-jamie-2018-phortonssf.c9users.io:8080/api/appUsers';
  
  //http://summer-jamie-2018-phortonssf.c9users.io:8080/api/appUsers/5b5949e6df90a62626c31352/stocks?access_token=5b5949e6df90a62626c31352

  
  // These functions return "Observables"
  
  registerUser(user) {
    return this.http.post(this.url, user);
  };
  
  loginUser(userData) {
    return this.http.post(this.url + '/login', userData);
  };
  
  logoutUser(token) {
      return this.http.post(this.url +'/logout' + '?access_token=' + token, {});
  };
  
  getUser(id, token) {
      return this.http.get(this.url + '/' + id + '?access_token=' + token );
  };
  
  
}
