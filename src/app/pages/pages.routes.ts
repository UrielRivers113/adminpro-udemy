import { RouterModule, Routes, CanActivate } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

// ------------------------------------------------------
// RUTAS QUE QUIERO PROTEGER
// ------------------------------------------------------

const pagesRoutes: Routes = [{
    path: '',
     component: PagesComponent,
     canActivate: [LoginGuardGuard],
     children: [
        {path: 'dashboard', component: DashboardComponent, data:{ titulo: 'Dashboard'}},
        {path: 'progress', component: ProgressComponent, data:{ titulo: 'Progress'}},
        {path: 'graficas1', component: Graficas1Component, data:{ titulo: 'Gráficas'}},
        {path: 'promesas', component: PromesasComponent, data:{ titulo: 'Promesas'}},
        {path: 'rxjs', component: RxjsComponent, data:{ titulo: 'RxJs'}},
        {path: 'account-settings', component: AccountSettingComponent, data:{ titulo: 'Ajustes del tema'}},
        {path: 'perfil', component: ProfileComponent, data:{ titulo: 'Perfil de usuario'}},
        // Mantenimientos
        {path: 'usuarios', component: UsuariosComponent, data:{ titulo: 'Mantenimiento de usuarios'}},
        {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    ]
}
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
