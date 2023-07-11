import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor (
                private AuthService: AuthService,
                private notifierService: NotifierService
    ) { }

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

  submitRegistration = async () => {
    console.log(this.registerForm.value);

    this.registerForm.markAllAsTouched();
    
    if (this.registerForm.invalid) {
      return this.notifierService.openErrorSnack('Invalid data inputs');
    }
  
    try {
      await this.AuthService.register(this.registerForm.value);
      this.notifierService.openSuccessSnack('Registration Successful');
    } catch (error) {
      this.notifierService.openErrorSnack('Registration Failed');
    }
  }
  
  submitLogin = async () => {
    console.log(this.loginForm.value);

    this.loginForm.markAllAsTouched();
    
    if (this.loginForm.invalid) {
      return this.notifierService.openErrorSnack('Invalid data inputs');
    }
  
    try {

      await this.AuthService.login(this.loginForm.value);
      this.notifierService.openSuccessSnack('Login Successful');
      
    } catch (error) {
      this.notifierService.openErrorSnack('Login Failed');
    }
  }
  
}







