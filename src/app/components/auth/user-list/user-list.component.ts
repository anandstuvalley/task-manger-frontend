import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  userList:any
  constructor( private authService:AuthService,) {
   
  }

  ngOnInit(){
    this.authService.getUserList().subscribe(
      (res)=>{
        this.userList=res
        console.log(res);
      }
    )
  }
}
