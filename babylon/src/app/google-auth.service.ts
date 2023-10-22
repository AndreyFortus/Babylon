import { Injectable } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
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

  name$ = this.nameSubject.asObservable();
  photoUrl$ = this.photoUrlSubject.asObservable();
  loggedIn$ = this.isLoggedInSubject.asObservable();

  private user: SocialUser = new SocialUser
  private accessToken = ''
  private authToken = ''

  constructor(private authService: SocialAuthService, private http: HttpClient) { }

  setUser(user: SocialUser) {
    this.user = user;
    console.log(this.user.id);
    this.setName(user.name);
    this.setPhotoUrl(user.photoUrl);
    this.setLoggedIn(true);
  }

  setName(name: string) {
    this.nameSubject.next(name);
  }

  setPhotoUrl(photoUrl: string) {
    this.photoUrlSubject.next(photoUrl);
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
        console.log(token);
        this.authToken = token;
        // Далее можно что-то сделать с полученным токеном, например, сохранить его в локальном хранилище или в куках
      },
      (error: any) => {
        // Обработка ошибки
        console.error('Ошибка при отправке запроса:', error);
      }
    );
  }

  signOut(): void {
    this.authService.signOut();
    this.setLoggedIn(false);
    this.setName('');
    this.setPhotoUrl('');
  }
}
