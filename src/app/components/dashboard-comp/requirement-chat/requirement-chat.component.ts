import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RequirementService } from '../../../services/requirement.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-requirement-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './requirement-chat.component.html',
  styleUrl: './requirement-chat.component.scss',
})
export class RequirementChatComponent {
  chatData: any;
  userId: string = '';
  role: string = '';
  requirementId!: string;
  constructor(
    private route: ActivatedRoute,
    private requirementService: RequirementService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.requirementId = this.route.snapshot.paramMap.get('id') || '';
    this.role = this.authService.getRole();
    this.userId = this.authService.getByeId();

    this.fetchChatById();
  }
  fetchChatById(): void {
    this.requirementService.getRequirementById(this.requirementId).subscribe({
      next: (res) => {
        this.chatData = res;
        console.log('chat data', this.chatData);
      },
      error: (err) => {
        console.error('Error fetching chats', err);
      },
    });
  }
}
