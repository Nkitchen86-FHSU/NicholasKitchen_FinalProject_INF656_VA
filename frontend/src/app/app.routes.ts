import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Assets } from './components/assets/assets';
import { Register } from './components/register/register';
import { Admin } from './components/admin/admin';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register},
    { path: 'dashboard', component: Dashboard },
    { path: 'assets', component: Assets},
    { path: 'admin', component: Admin}
];
