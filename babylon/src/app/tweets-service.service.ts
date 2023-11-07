import { Injectable } from '@angular/core';
import { GoogleAuthService } from './google-auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TweetsServiceService {

  constructor(private googleService: GoogleAuthService, private http: HttpClient) { }

  url = 'http://127.0.0.1:8000/api/tweets/'

  getTweets() {
    
  }

}
