import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
email: any;
password: any;
username: any;
firstname: any;
lastname: any;
confirmPassword: any;

  
  constructor ( private AuthService: AuthService,
                private _snackBar: MatSnackBar
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


  submitRegistration = () => {
    console.log(this.registerForm.value)

    this.AuthService.register(this.registerForm.value)

  }

  openRegisterSnackBar(username: any, email: any, firstname: any, lastname: any, password: any, confirmPassword: any) {
    if(username && email && firstname && lastname && password && confirmPassword) {
      this._snackBar.open('Sign Up successfully!', 'OK', {
        duration: 2000,
        verticalPosition : 'top',
      })
  } else if (password !== confirmPassword){
    this._snackBar.open('Sign Up failed! Passwords do not match!', 'OK', {
      duration: 2000,
      verticalPosition : 'top',
    })
  } else {
    this._snackBar.open('Sign Up failed!', 'OK', {
      duration: 2000,
      verticalPosition : 'top',
    })
  }
}

  submitLogin = () => {
    console.log(this.loginForm.value)

    this.AuthService.login(this.loginForm.value)
    
  }
  
  openLoginSnackBar(email: any, password: any) {
    if(email && password) {

      
      this._snackBar.open('Sign In successfully!', 'OK', {
        duration: 2000,
        horizontalPosition : 'center',
      })
  } else {

    
    this._snackBar.open('Sign In failed!', 'OK', {
      duration: 2000,
      horizontalPosition : 'center',
    })
  }
}
}