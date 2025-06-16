import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import { TaskService } from '../../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-remark',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-remark.component.html',
  styleUrl: './add-remark.component.scss'
})
export class AddRemarkComponent {

  taskId:string="";
  userList:any
  taskForm!: FormGroup;
  uploadedFile: File | null = null;

  constructor(private fb: FormBuilder,private taskService:
     TaskService, private authService:AuthService, 
      private router: Router,
    private route:ActivatedRoute) {
  }

  ngOnInit(){


    this.route.paramMap.subscribe(params=>{
      const id=params.get('id');
      if(id){
        this.taskId=id;
        console.log("Task ID from URL",this.taskId);
        
      }
    })

    this.authService.getUserList().subscribe(
      (res)=>{
        this.userList=res
        console.log(res);
      }
    )
     this.taskForm = this.fb.group({
      status:[''],
      message: ['']
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
  formData.append('status', this.taskForm.value.status);
  formData.append('message', this.taskForm.value.message);

  if (this.uploadedFile) {
    formData.append('completeFile', this.uploadedFile);
  }

  this.taskService.updateTaskRemark(this.taskId, formData).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Remark Submitted',
        text: 'Your task has been updated successfully!'
      });
      this.taskForm.reset();
      this.uploadedFile = null;
      this.router.navigate(['/dashboard/remark-list/'+this.taskId]);
    },
    error: () => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong while submitting the remark.'
      });
    }
  });
}

}
