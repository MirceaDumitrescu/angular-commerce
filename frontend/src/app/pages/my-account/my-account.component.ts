import { Component } from '@angular/core';

interface INav {
  title: string;
  path: string;
}

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent {
  pageTitle: string = 'MY ACCOUNT';
  navigationItems: INav[] = [
    {
      title: 'Dashboard',
      path: '/my-account',
    },
    {
      title: 'Orders',
      path: 'orders',
    },
    {
      title: 'Addresses',
      path: 'edit-address',
    },
    {
      title: 'Payment Methods',
      path: 'payment-methods',
    },
    {
      title: 'Favourites',
      path: 'favourites',
    },

    {
      title: 'Logout',
      path: '',
    },
  ];
}
