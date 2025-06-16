import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/dashboard-comp/dashboard/dashboard.component';
import { SideBarComponent } from './components/sidebar-layout/side-bar/side-bar.component';
import { AssignTaskComponent } from './components/dashboard-comp/assign-task/assign-task.component';
import { TaskListComponent } from './components/dashboard-comp/task-list/task-list.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { LoginGuard } from './guards/login.guard';
import { UserListComponent } from './components/auth/user-list/user-list.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AddRemarkComponent } from './components/dashboard-comp/add-remark/add-remark.component';
import { RemarkListComponent } from './components/dashboard-comp/remark-list/remark-list.component';
import { AddRequirementComponent } from './components/dashboard-comp/add-requirement/add-requirement.component';
import { ListRequirementComponent } from './components/dashboard-comp/list-requirement/list-requirement.component';

export const routes: Routes = [
  { path: '', component: LoginComponent , canActivate: [LoginGuard]},
  {
    path: 'dashboard',
    component: SideBarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'assign-task',
        component: AssignTaskComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin', 'coadmin'] },
      },
      {
        path: 'task-list',
        component: TaskListComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin', 'coadmin', 'user'] },
      },
      {
        path:"user-list",
        component:UserListComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin', 'coadmin'] },
      },
       {
        path:"add-user",
        component:RegisterComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin', 'coadmin'] },
      },

      {
        path:"add-remark/:id",
        component:AddRemarkComponent,
        canActivate:[RoleGuard],
        data: { roles: ['user'] },
      },
      {
        path:"remark-list/:id",
        component:RemarkListComponent,
        canActivate:[RoleGuard],
        data: { roles: ['user','admin', 'coadmin'] },
      },

      {
        path:"add-requirements",
        component:AddRequirementComponent,
        canActivate:[RoleGuard],
        data: { roles: ['user'] },
      },

        {
        path:"requirements-list",
        component:ListRequirementComponent,
        canActivate:[RoleGuard],
        data: { roles: ['user','admin', 'coadmin'] },
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
