import { SocialAuthService} from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from '../google-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string = ''
  photoUrl: string = ''
  loggedIn: boolean = false;

  constructor(private authService: SocialAuthService, private googleService: GoogleAuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.googleService.setUser(user)
      this.googleService.sendToken()
      this.googleService.name$.subscribe(name => {
        this.username = name;
      });
      this.googleService.photoUrl$.subscribe(photoUrl => {
        this.photoUrl = photoUrl;
      });
      this.googleService.loggedIn$.subscribe(loggedIn => {
        this.loggedIn = loggedIn;
      })
    });

  }

  signOut(): void {
    this.googleService.signOut();
  }

}
