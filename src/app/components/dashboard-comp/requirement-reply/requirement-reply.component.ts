// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import {
//   FormBuilder,
//   FormGroup,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import Swal from 'sweetalert2';
// import { TaskService } from '../../../services/task.service';
// import { AuthService } from '../../../services/auth.service';
// import { RequirementService } from '../../../services/requirement.service';
// @Component({
//   selector: 'app-requirement-reply',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './requirement-reply.component.html',
//   styleUrl: './requirement-reply.component.scss',
// })
// export class RequirementReplyComponent {
//   userList: any;
//   taskForm!: FormGroup;
//   uploadedFile: File | null = null;
//   requirementId: string = '';
//   formData: any;
//   constructor(
//     private fb: FormBuilder,
//     private taskService: TaskService,
//     private authService: AuthService,
//     private router: Router,
//     private route: ActivatedRoute,
//     private requirementService: RequirementService
//   ) {}

//   ngOnInit() {
//     this.route.paramMap.subscribe((params) => {
//       const id = params.get('id');
//       if (id) {
//         this.requirementId = id;
//         console.log('requirement ID from URL', this.requirementId);
//       }
//     });
//     this.authService.getUserList().subscribe((res) => {
//       this.userList = res;
//     });
//     this.taskForm = this.fb.group({
//       reply: ['', Validators.required],
//     });
//     this.fetchFormData();
//   }

//   fetchFormData(): void {
//     this.requirementService.getRequirementById(this.requirementId).subscribe({
//       next: (res) => {
//         this.formData = res;
//         console.log(this.formData);
//       },
//       error: (err) => {
//         console.error('Error fetching requirements:', err);
//       },
//     });
//   }
//   onFileSelected(event: any) {
//     const file = event.target.files[0];
//     if (file) {
//       this.uploadedFile = file;
//       console.log('Selected file:', file.name);
//     }
//   }

//   triggerFileInput(fileInput: HTMLInputElement) {
//     fileInput.click();
//   }

//   onSubmit() {
//     if (this.taskForm.invalid) {
//       this.taskForm.markAllAsTouched();
//       return;
//     }

//     const formData = new FormData();
//     formData.append('replyComment', this.taskForm.value.replyComment);
//     formData.append('status', 'Pending');
//     formData.append('date', new Date().toISOString());

//     if (this.uploadedFile) {
//       formData.append('replyFile', this.uploadedFile);
//     }

//     this.requirementService.addReply(this.requirementId, formData).subscribe({
//       next: () => {
//         Swal.fire({
//           icon: 'success',
//           title: 'Task Assigned',
//           text: 'The task was assigned successfully!',
//         });
//         this.taskForm.reset();
//         this.uploadedFile = null;
//         this.router.navigate(['/dashboard/task-list']);
//         //
//       },
//       error: () => {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Something went wrong while assigning the task.',
//         });
//       },
//     });
//   }
// }
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
import { RequirementService } from '../../../services/requirement.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-requirement-reply',
  standalone: true,
  templateUrl: './requirement-reply.component.html',
  styleUrls: ['./requirement-reply.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class RequirementReplyComponent implements OnInit {
  taskForm!: FormGroup;
  uploadedFile: File | null = null;
  formData: any = {}; // Replace with actual data type if available
  requirementId!: string;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private requirementService: RequirementService // <-- this should match your service class
  ) {}

  ngOnInit(): void {
    this.requirementId = this.route.snapshot.paramMap.get('id') || '';
    this.initForm();
    this.loadRequirementData();
  }

  initForm() {
    this.taskForm = this.fb.group({
      replyComment: [''],
      status: [''],
      date: [''],
    });
  }

  loadRequirementData() {
    // Replace with actual API to get requirement data
    this.requirementService.getRequirementById(this.requirementId).subscribe({
      next: (res) => {
        this.formData = res;
      },
      error: (err) => {
        console.error('Failed to load requirement', err);
      },
    });
  }

  triggerFileInput(input: any) {
    input.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadedFile = file;
    }
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      Swal.fire('Validation Error', 'Please fill required fields', 'error');
      return;
    }

    const formValues = this.taskForm.value;
    const formData = new FormData();
    formData.append('replyComment', formValues.replyComment || '');
    formData.append('status', formValues.status);
    formData.append('date', formValues.date || new Date().toISOString());

    if (this.uploadedFile) {
      formData.append('replyFile', this.uploadedFile);
    }

    this.requirementService.addReply(this.requirementId, formData).subscribe({
      next: (res) => {
        Swal.fire('Success', 'Reply added successfully', 'success');
        this.taskForm.reset();
        this.uploadedFile = null;
      },
      error: (err) => {
        console.error('Upload error:', err);
        Swal.fire('Error', 'Failed to send reply', 'error');
      },
    });
  }
}
