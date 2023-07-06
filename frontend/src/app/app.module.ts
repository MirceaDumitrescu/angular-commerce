import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';

import { AuthenticationComponent } from './components/authentication/authentication.component';
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

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotifierComponent } from './pages/notifier/notifier.component';


const pages = [
  AppComponent,
  HomepageComponent,
  AuthComponent,
  MyAccountComponent,
  CategoriesComponent,
  ProductComponent,
  CheckoutComponent,
  DashboardComponent,
  OrdersComponent,
  PaymentMethodsComponent,
  FavouritesComponent,
  AddressesComponent,
];
const components = [
  NavigationComponent,
  AuthenticationComponent,
  FooterComponent,
];

@NgModule({
  declarations: [...pages, ...components, NotifierComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule, 
    AppRoutingModule, 
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatCheckboxModule,
    MatSnackBarModule
  
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
