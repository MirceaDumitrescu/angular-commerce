import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  register = async (registrationData: any) => {
    const raw = JSON.stringify(registrationData);
    try {
      const regiserFetch = await fetch(
        'http://localhost:3000/api/auth/register',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
          body: raw,
        }
      );
      if (!regiserFetch.ok) {
        return await regiserFetch.json();
      }
      return regiserFetch.json();
    } catch (error) {
      return error;
    }
    // return fetch('http://localhost:3000/api/auth/register', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json, text/plain, */*',
    //     'Content-Type': 'application/json',
    //   },
    //   body: raw,
    // })
    //   .then((response) => {
    //     console.log(response);
    //     return response.json();
    //   })
    //   .then((result: any) => {
    //     console.log(result);
    //     return result;
    //   })
    //   .catch((error) => {
    //     return error;
    //   });
  };

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
        console.log(result);
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  constructor() {}
}
