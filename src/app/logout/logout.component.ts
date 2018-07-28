import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private _service: UserService, private router: Router) { }

  ngOnInit() {
  }
  
//   user: any = {
//     token: '',
//     userId: ''
//   }

  //userToken: number = 0;
  
    
  logout() {
    console.log("logging out");
    this._service.logoutUser(window.sessionStorage.getItem('token'));
    window.sessionStorage.clear();
    this.router.navigateByUrl('/login');
  };
  
}
