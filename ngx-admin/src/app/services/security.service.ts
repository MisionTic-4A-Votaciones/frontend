import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  user = new BehaviorSubject<User>(new User());

  constructor(private http: HttpClient,
<<<<<<< HEAD
    private router: Router) {
=======
    private router: Router) { 
>>>>>>> ab9db7cfdba1e94cf998641a68f57f8944b2140e
      this.verifyCurrentSession();
    }

  public get userCurrentSession(): User {
    /**
     * retorna informacion de la actual sesión tipo usuario/ informacion del comportamiento del usuario
     */
    return this.user.value;
  }

  public getUser() {
    /**
     * Current state of the object user
     */
    return this.user.asObservable();
  }

  public setUser(user: User) {
    /**
     * Cuando actualiza, no sobreescribe lo mueve al siguiente estado
     */
    this.user.next(user);
  }

  public validateLogin(user: User): Observable<User> {
    /**
     * validate user log in
     */
    return this.http.post<User>(`${environment.url_api_gateway}/login`, user);
  }

  public saveSessionData(sessionData: any) {
    /**
     *
     */
     // console.log(sessionData);
    let userData: User = {
      /**
       *
       */
      id: sessionData.user_id,
      token: sessionData.token,
    };
    localStorage.setItem('session', JSON.stringify(userData));
    this.setUser(userData);
  }

  public getSessionData(): any {
    /**
     *
     */
    let currentSession = localStorage.getItem('session');
    return currentSession;
  }

  public verifyCurrentSession() {
    /**
     *
     */
    let currentSession = this.getSessionData();
    if (currentSession)
      this.setUser(JSON.parse(currentSession));
  }

  public isThereSession(): boolean {
    /**
     * Verify session
     */
    let currentSession = this.getSessionData();
    return (currentSession) ? true : false;
  }

  public logOut() {
    /**
     * Log out session
     */
    localStorage.removeItem('session');
    this.setUser(new User());
  }
}

