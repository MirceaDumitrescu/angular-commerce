import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AuthComponent } from './pages/auth/auth.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductComponent } from './pages/product/product.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { DashboardComponent } from './pages/my-account/dashboard/dashboard.component';
import { OrdersComponent } from './pages/my-account/orders/orders.component';
import { PaymentMethodsComponent } from './pages/my-account/payment-methods/payment-methods.component';
import { FavouritesComponent } from './pages/my-account/favourites/favourites.component';
import { AddressesComponent } from './pages/my-account/addresses/addresses.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'register',
    component: AuthComponent,
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'edit-address',
        component: AddressesComponent,
      },
      {
        path: 'payment-methods',
        component: PaymentMethodsComponent,
      },
      {
        path: 'favourites',
        component: FavouritesComponent,
      },
    ],
  },
  {
    path: 'categories/:id',
    component: CategoriesComponent,
  },
  {
    path: 'product/:id',
    component: ProductComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
