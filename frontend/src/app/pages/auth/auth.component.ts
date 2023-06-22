import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  
  constructor (private AuthService: AuthService) { }

  registerForm = new FormGroup ({

    username: new FormControl("", [Validators.required, Validators.minLength(2)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    firstname: new FormControl("", [Validators.required, Validators.minLength(2)]),
    lastname: new FormControl("", [Validators.required, Validators.minLength(2)]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl("", [Validators.required, Validators.minLength(6)]),


  }) 


  loginForm = new FormGroup ({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
  })

  submitRegistration = () => {
    console.log(this.registerForm.value)

    this.AuthService.register(this.registerForm.value)
  }

  submitLogin = () => {
    console.log(this.loginForm.value)

    this.AuthService.login(this.loginForm.value)
  }
}
