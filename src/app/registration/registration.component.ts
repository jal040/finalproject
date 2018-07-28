import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private _service: UserService, private router: Router) { }

  ngOnInit() {
  }
  
  userStatus: string = 'login';
  
  user: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  
  
  goToLogin(){
    this.router.navigateByUrl('/login');
  }
  
  submit() {
    console.log("IS IT SUBMITTING");
    this._service.registerUser( this.user ).subscribe(
      (res: any) => {
        console.log(res);
        window.sessionStorage.setItem('token', res.token);
        window.sessionStorage.setItem('userId', res.userId);
      }
    );
    alert(`Congrats ${this.user.firstName}! You've just registered!`);
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.email = '';
    this.user.password = '';
  };


}
