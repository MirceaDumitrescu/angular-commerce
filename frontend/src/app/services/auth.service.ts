import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  register = (registrationData: any) => {
    const raw = JSON.stringify(registrationData);

    fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: raw,
    })
      .then((response) => {
        return response.json();
      })
      .then((result: any) => {
        console.log(result)
          return result;
      })
      .catch((error) => {
        console.log(error);
      });

  }

  login = (loginData: any) => {
    const raw = JSON.stringify(loginData);

    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: raw,
    })
      .then((response) => {
        return response.json();
      })
      .then((result: any) => {
        console.log(result)
          return result;
      })
      .catch((error) => {
        console.log(error);
      });


  }
  constructor() { }
}
