import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  roles: string = '';
  responsibleId: string = '';

  taskList: any;
  getRatingBadge(rating: number): string {
    if (rating >= 4.5) return 'bg-success-subtle text-success';
    if (rating >= 3.5) return 'bg-primary-subtle text-primary';
    return 'bg-warning-subtle text-warning';
  }

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const role = this.authService.getRole();
    this.roles = role;
    if (role === 'user') {
      this.responsibleId = this.authService.getByeId();
      console.log('Responsible ID:', this.responsibleId);

      this.taskService.getByResponsibleTasks(this.responsibleId).subscribe(
        (res) => {
          console.log('Tasks for user:', res);
          this.taskList = res; // ✅ Assign result to taskList
        },
        (err) => {
          console.error('Error fetching user tasks:', err);
        }
      );
    } else {
      this.taskService.getAllTasks().subscribe(
        (res) => {
          console.log('All tasks:', res);
          this.taskList = res;
        },
        (err) => {
          console.error('Error fetching all tasks:', err);
        }
      );
    }
  }
}
