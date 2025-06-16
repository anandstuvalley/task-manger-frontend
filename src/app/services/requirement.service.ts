import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {

   private apiUrl = 'https://api.prayug.co.in/api/requirements'; // Adjust if needed

  constructor(private http: HttpClient, private auth: AuthService) {}

  // POST: Add new requirement
  addRequirement(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  // GET: Get requirement by ID
  getRequirementById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // GET: Get requirements by user ID
  getRequirementsByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  // GET: Get all requirements
  getAllRequirements(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }


}
