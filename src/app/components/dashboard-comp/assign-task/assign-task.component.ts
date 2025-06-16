import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TaskService } from '../../../services/task.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-assign-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ],
  templateUrl: './assign-task.component.html',
  styleUrl: './assign-task.component.scss'
})
export class AssignTaskComponent {

  userList:any
  taskForm!: FormGroup;
  uploadedFile: File | null = null;

  constructor(private fb: FormBuilder,private taskService:
     TaskService, private authService:AuthService,  private router: Router) {
   
  }

  ngOnInit(){
    this.authService.getUserList().subscribe(
      (res)=>{
        this.userList=res
        console.log(res);
      }
    )
     this.taskForm = this.fb.group({
      title:[''],
      website: ['', Validators.required],
      description: ['', Validators.required],
      responsible: [''],
      comment: ['']
    });
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadedFile = file;
      console.log('Selected file:', file.name);
    }
  }

  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

onSubmit() {
  if (this.taskForm.invalid) {
    this.taskForm.markAllAsTouched();
    return;
  }

  const formData = new FormData();
  formData.append('title', this.taskForm.value.title);
  formData.append('website', this.taskForm.value.website);
  formData.append('description', this.taskForm.value.description);
  formData.append('responsible', this.taskForm.value.responsible || '');
  formData.append('comment', this.taskForm.value.comment || '');

  if (this.uploadedFile) {
    formData.append('material', this.uploadedFile);
  }

  this.taskService.createTask(formData).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Task Assigned',
        text: 'The task was assigned successfully!'
      });
      this.taskForm.reset();
      this.uploadedFile = null;
this.router.navigate(['/dashboard/task-list']);
      // 
    },
    error: () => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong while assigning the task.'
      });
    }
  });
}


}
