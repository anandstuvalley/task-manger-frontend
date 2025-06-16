import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarLinkComponent } from "../sidebar-link/sidebar-link.component";
import { DashboardComponent } from "../../dashboard-comp/dashboard/dashboard.component";
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule,RouterOutlet, SidebarLinkComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  name:string=""
    isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
cards = [
  { title: 'Campaign Sent', value: 865, trend: 5.27 },
  { title: 'New Leads', value: 384, trend: -3.27 },
  { title: 'Deals', value: 34521, trend: 8.58 },
  { title: 'Booked Revenue', value: '$89,357', trend: 34.61 },
];

constructor(private authService:AuthService){}

ngOnInit(){
 const data =this.authService.getName()
 console.log(data);
 this.name=data
}

}
