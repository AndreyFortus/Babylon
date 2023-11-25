import { Component, OnInit } from '@angular/core';
import { TweetsServiceService } from '../tweets-service.service';
import { GoogleAuthService } from '../google-auth.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

  tweets_list: Tweet[] = [];
  post: string = '';
  loggedIn: boolean = false;

  constructor (private tweetsService: TweetsServiceService, private googleService: GoogleAuthService) {}

  ngOnInit(): void {
    this.tweetsService.tweetsList$.subscribe(tweetsList => {
      this.tweets_list = tweetsList;
    });
    this.googleService.loggedIn$.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
      this.tweets_list = [];
      this.tweetsService.getTweets();
    })
  }

  sendTweet() {
    this.tweetsService.sendTweet(this.post);
    this.post = '';
  }

}

class Tweet {
  id: number;
  content: string;
  created_at: string;
  user: string;

  constructor(id: number, content: string, created_at: string, user: string){
    this.id = id;
    this.content = content;
    this.created_at = created_at;
    this.user = user;
  }
}
