import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { User } from "../../models/User";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @Output() signUpUser: EventEmitter<User> = new EventEmitter();
   user: User = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('submitting ...');
     const user = {
       email: this.user.email,
       password: this.user.password
     };

    this.authService.login(user).subscribe(user => {
      console.log(user);
      if (user.token){
        localStorage.setItem("access-token", user.token);
        this.signUpUser.emit(user);
        this.router.navigate(['/dashboard'], {
          queryParams: { token: user.token }
        })
      }
    })

  }

}
