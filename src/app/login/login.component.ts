import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _service: UserService, private router: Router) { }

  ngOnInit() {
  }
  
  user: any = {
    email: '',
    password: ''
  }
  
  loginSuccessful: boolean = false;
    
  login() {
    console.log("logging in");
    this._service.loginUser(this.user).subscribe(
      (res:any) => {
        console.log(res);
        
        window.sessionStorage.setItem('token', res.token);
        window.sessionStorage.setItem('userId', res.userId);
        this.router.navigateByUrl('/home');
      }
    );
    this.loginSuccessful = true;
  };
  
  goTosignUp() {
    this.router.navigateByUrl('/registration');
  }

}
