import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { RegisterModulePageComponent } from './register-module-page/register-module-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: 'products', component: HomeComponent },
    { path: 'register', component: RegisterModulePageComponent },
    { path: "login", component: LoginPageComponent},
    { path: 'contact', component: ContactComponent },
    { path: 'cart', component: CartComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})

export class AppRoutingMoudule { }
