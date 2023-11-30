import { Injectable, OnInit } from '@angular/core';
import { GoogleAuthService } from './google-auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TweetsServiceService implements OnInit {

  constructor(private googleService: GoogleAuthService, private http: HttpClient) { }
  
  private tweetsListSubject = new BehaviorSubject<Tweet[]>([]);
  tweetsList$ = this.tweetsListSubject.asObservable();
  token = this.googleService.getAuthToken();
  url = 'http://127.0.0.1:8000/api/tweets/';

  ngOnInit(): void {
    
  }

  getTweets() {
    this.tweetsListSubject.next([]);
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Token ${this.googleService.getAuthToken()}`)
    }
    this.http.get(this.url+'list', header).subscribe((response: any) => {
      for (let tweet of response) {
        const currentList = this.tweetsListSubject.value;
        currentList.push(new Tweet(tweet.id, tweet.content, tweet.created_at, tweet.user));
        this.tweetsListSubject.next(currentList);
      } 
    });
  }

  sendTweet(content: string) {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Token ${this.googleService.getAuthToken()}`)
    }
    this.http.post(this.url+'add', {"content": content}, header).subscribe((response: any) => {this.getTweets();});
  }

  reversed(list: Tweet[]) {
    return list.reverse();
  }
}


export class Tweet {
  id: number;
  content: string;
  created_at: string;
  user: string;

  constructor(id: number, content: string, created_at: string, user: string){
    this.id = id;
    this.content = content;
    this.created_at = created_at.replace('T', '\n').slice(0, -3);
    this.user = user;
  }
}
