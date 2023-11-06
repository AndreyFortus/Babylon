import { Injectable } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

// How to use:
// 1. import { GoogleAuthService } from '../google-auth.service';
// 2. constructor(private googleService: GoogleAuthService){}
// 3. import OnInit and implements OnInit on component class
// 4. ngOnInit(): void {
//   this.googleService.name$.subscribe(name => {
//     this.username = name;
//   });
// }

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  private nameSubject = new BehaviorSubject<string>('');
  private photoUrlSubject = new BehaviorSubject<string>('');
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private usernameSubject = new BehaviorSubject<string>('');
  private emailSubject = new BehaviorSubject<string>('');
  private levelSubject = new BehaviorSubject<number>(0);

  name$ = this.nameSubject.asObservable();
  photoUrl$ = this.photoUrlSubject.asObservable();
  loggedIn$ = this.isLoggedInSubject.asObservable();
  username$ = this.usernameSubject.asObservable();
  email$ = this.emailSubject.asObservable();
  level$ = this.levelSubject.asObservable();

  private user: SocialUser = new SocialUser
  private accessToken = ''
  private authToken = ''

  constructor(private authService: SocialAuthService, private http: HttpClient) { }

  setUser(user: SocialUser) {
    this.user = user;
    this.setLoggedIn(true);
  }

  setName(name: string) {
    this.nameSubject.next(name);
  }

  setPhotoUrl(photoUrl: string) {
    this.photoUrlSubject.next(photoUrl);
  }

  setUsername(username: string) {
    this.usernameSubject.next(username);
  }

  setEmail(email: string) {
    this.emailSubject.next(email);
  }

  setlevel(level: number) {
    const url = 'http://127.0.0.1:8000/api/user-update-level/';
    const headers = new HttpHeaders().set('Authorization', `Token ${this.authToken}`);
    const data = { "level": level };
    this.http.patch(url, data, { headers: headers }).subscribe(
      (response) => {
        // Обработка успешного ответа от сервера
        console.log(response);
      });
    this.levelSubject.next(level);
    console.log('set level', this.level$);
  }

  setLoggedIn(loggedIn: boolean) {
    this.isLoggedInSubject.next(loggedIn);
  }

  getAuthToken() {
    return this.authToken;
  }

  sendToken(): void {
    this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => {this.accessToken = accessToken;
      console.log("token", accessToken);
      this.sendAccessTokenToServer(accessToken);})
      .catch(error => {
        console.error('Error getting access token: ', error);
      });
  }

  sendAccessTokenToServer(accessToken: string): void {
    const url = 'http://127.0.0.1:8000/auth/google/';
  
    // Отправка accessToken на сервер
    this.http.post(url, { google_token: accessToken }).subscribe(
      (response: any) => {
        // Обработка успешного ответа
        const token = response.token;
        console.log("auth_token", token);
        this.authToken = token;
        // Далее можно что-то сделать с полученным токеном, например, сохранить его в локальном хранилище или в куках
        this.getUserInfo(this.authToken);
      },
      (error: any) => {
        // Обработка ошибки
        console.error('Ошибка при отправке запроса:', error);
      }
    );
  }

  getUserInfo(authToken: string) {
    const url = 'http://127.0.0.1:8000/api/get-user-info/'
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Token ${authToken}`)
    }
    this.http.get(url, header).subscribe((response: any) => {
      console.log(response);
      this.setName(response.first_name + " " + response.last_name);
      this.setPhotoUrl(response.profile_picture);
      this.setUsername(response.username);
      this.setEmail(response.email);
      this.setlevel(response.level);
      console.log(this.name$, this.photoUrl$, this.username$, this.email$, this.level$)
    });
  }

  signOut(): void {
    this.authService.signOut();
    this.setLoggedIn(false);
    this.setName('');
    this.setPhotoUrl('');
    this.setEmail('');
    this.setUsername('');
    // this.setlevel(0);
  }
}
