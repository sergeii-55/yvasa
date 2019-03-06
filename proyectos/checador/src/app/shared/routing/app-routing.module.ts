import { NgModule } from '@angular/core';
// Required services for navigation
import { Routes, RouterModule } from '@angular/router';

// Import all the components for which navigation service has to be activated 
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { ManagerComponent } from '../../components/manager/manager.component';
import { ReporteComponent } from '../../components/reporte/reporte.component';

// Import canActivate guard services
import { AuthGuard } from "../../shared/guard/auth.guard";
import { SecureInnerPagesGuard } from "../../shared/guard/secure-inner-pages.guard.ts.guard";

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'manager', component: ManagerComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'reporte', component: ReporteComponent, canActivate: [SecureInnerPagesGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }