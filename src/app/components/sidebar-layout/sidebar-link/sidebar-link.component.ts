import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-link',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './sidebar-link.component.html',
  styleUrl: './sidebar-link.component.scss'
})
export class SidebarLinkComponent {
role: string = '';

  constructor(private authService: AuthService,private router: Router) {
    this.role = this.authService.getRole();
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
