import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RequirementService } from '../../../services/requirement.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-requirement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-requirement.component.html',
  styleUrl: './add-requirement.component.scss'
})
export class AddRequirementComponent {

  requirementForm!:FormGroup;

  constructor(private fb:FormBuilder,
     private requirementService: RequirementService
    , private auth:AuthService){}

  ngOnInit(){
   const id= this.auth.getByeId();
    this.requirementForm=this.fb.group({
    requirementTitle:[''],
    requirementMessage:[''],
    userId:[id]
    })
  }

  
onSubmit() {
  if (this.requirementForm.valid) {
    this.requirementService.addRequirement(this.requirementForm.value).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Requirement has been added successfully.',
          timer: 2000,
          showConfirmButton: false
        });
        this.requirementForm.reset();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add requirement. Please try again.',
        });
        console.error('Error:', err);
      }
    });
  }
}


}
