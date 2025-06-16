import { Component } from '@angular/core';
import { SideBarComponent } from "../../sidebar-layout/side-bar/side-bar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
cards = [
  { title: 'Completed', value: 0, trend: 5.27 },
  { title: 'Pending', value: 0, trend: -3.27 },
  { title: 'Assign', value: 0, trend: 8.58 },
  { title: 'Total Task', value: 0, trend: 34.61 },
];
}
