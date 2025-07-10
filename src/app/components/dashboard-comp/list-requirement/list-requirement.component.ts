import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequirementService } from '../../../services/requirement.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-list-requirement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-requirement.component.html',
  styleUrl: './list-requirement.component.scss',
})
export class ListRequirementComponent implements OnInit {
  requirements: any[] = [];
  userId: string = '';
  role: string = '';

  constructor(
    private requirementService: RequirementService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.userId = this.authService.getByeId();

    if (this.role === 'user') {
      this.fetchRequirementsByUser();
    } else {
      this.fetchRequirementsAll();
    }
  }

  fetchRequirementsByUser(): void {
    this.requirementService.getRequirementsByUserId(this.userId).subscribe({
      next: (res) => {
        this.requirements = res;
        console.log(this.requirements);
      },
      error: (err) => {
        console.error('Error fetching requirements:', err);
      },
    });
  }
  fetchRequirementsAll(): void {
    this.requirementService.getAllRequirements().subscribe({
      next: (res) => {
        this.requirements = res;
        console.log(this.requirements);
      },
      error: (err) => {
        console.error('Error fetching requirements:', err);
      },
    });
  }
}
