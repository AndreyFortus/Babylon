import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: SocialUser = new SocialUser;
  loggedIn: boolean = false;
  accessToken = ''; 

  constructor(private authService: SocialAuthService, private http: HttpClient) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.getAccessToken();
      localStorage.setItem('username', user.name);
      localStorage.setItem('photourl', user.photoUrl);
    });

  }

  getAccessToken(): void {
    this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => {this.accessToken = accessToken;
      this.sendAccessTokenToServer(accessToken);
      localStorage.setItem('token', accessToken);})
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
  }

}
