import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

// task.service.ts
@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getAllTasks() {
    return this.http.get('https://api.prayug.co.in/api/tasks', {
      headers: { Authorization: `Bearer ${this.auth.getToken()}` },
    });
  }
  getByResponsibleTasks(id: string) {
    return this.http.get('https://api.prayug.co.in/api/tasks/responsible/' + id, {
      headers: { Authorization: `Bearer ${this.auth.getToken()}` },
    });
  }

  createTask(data: any) {
    return this.http.post('https://api.prayug.co.in/api/tasks', data, {
      headers: { Authorization: `Bearer ${this.auth.getToken()}` },
    });
  }

  getMyTasks() {
    return this.http.get('/api/tasks/me', {
      headers: { Authorization: `Bearer ${this.auth.getToken()}` },
    });
  }

  updateTaskStatus(id: string, status: string) {
    return this.http.put(
      `/api/tasks/${id}/status`,
      { status },
      {
        headers: { Authorization: `Bearer ${this.auth.getToken()}` },
      }
    );
  }

  updateTaskRemark(taskId: string, data: FormData) {
    return this.http.put(`https://api.prayug.co.in/api/tasks/remark/${taskId}`, data, {
      headers: { Authorization: `Bearer ${this.auth.getToken()}` },
    });
  }
  taskRemarkList(taskId: string) {
    return this.http.get(`https://api.prayug.co.in/api/tasks/task-by-id/${taskId}`, {
      headers: { Authorization: `Bearer ${this.auth.getToken()}` },
    });
  }
}


