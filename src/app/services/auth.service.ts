import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

// auth.service.ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'token';
  private user: any = null;

  constructor(private http: HttpClient) {}

login(email: string, password: string): Observable<any> {
  return this.http.post('https://api.prayug.co.in/api/auth/login', { email, password }).pipe(
    tap((res: any) => {
      localStorage.setItem(this.tokenKey, res.token);
      this.user = res.user;
    })
  );
}

getUserList() {
  return this.http.get('https://api.prayug.co.in/api/auth/users', {
    headers: {
      Authorization: `Bearer ${this.getToken()}`
    }
  });
}


  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

getRole(): string {

  const token = this.getToken();
  if (!token) return '';
  const payload = JSON.parse(atob(token.split('.')[1]));

  return payload.role;

}
getByeId(): string {
  const token = this.getToken();
  if (!token) return '';
  const payload = JSON.parse(atob(token.split('.')[1]));

  return payload.id;
}

getName(): string {
  const token = this.getToken();
  if (!token) return '';
  const payload = JSON.parse(atob(token.split('.')[1]));

  return payload.name;
}


  decodeRoleFromToken(): string {
    const token = this.getToken();
    if (!token) return '';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || '';
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.user = null;
  }

  isLoggedIn() {
    return !!this.getToken();
  }


  registerUser(data:any){
    return this.http.post("https://api.prayug.co.in/api/auth/register",data)
  }
}
