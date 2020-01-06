import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../../models/User";
import {AuthService} from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User = {
    email: '',
    password: '',
    username: '',
    status: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    const user = {
      email: this.user.email,
      username: this.user.username,
      password: this.user.password
    };

    console.log('submitting', user);
    this.authService.signUp(user).subscribe(user => {
      if (user.status === 'success'){
        this.router.navigate(['/signin'])
      }
      console.log(user)
    })
  }

}
