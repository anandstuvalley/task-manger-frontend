import { Component } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-remark-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './remark-list.component.html',
  styleUrl: './remark-list.component.scss',
})
export class RemarkListComponent {
  taskId: string = '';
task: any
  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.taskId = id;
        console.log('Task ID from URL', this.taskId);
      }
    });

    this.taskService.taskRemarkList(this.taskId).subscribe((res) => {
      console.log(res);
       this.task = res; 
    });
  }
}
