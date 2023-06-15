import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

const pages = [
  AppComponent,
  HomepageComponent,
  AuthComponent,
  MyAccountComponent,
  CategoriesComponent,
  ProductComponent,
  CheckoutComponent,
];
const components = [
  NavigationComponent,
  AuthenticationComponent,
  FooterComponent,
];

@NgModule({
  declarations: [...pages, ...components],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
