import { Component, OnInit } from '@angular/core';
import { ChatApiService } from '../chat-api.service';
import { GoogleAuthService } from '../google-auth.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  
  
  isLoggedIn: boolean = false;
  private ngUnsubscribe = new Subject();users: string[] = [];
  messages: string[] = [];
  avatars: string[] = [];
  usernames: string[] = [];
  isConversation: boolean = false;
  conversationId: number = -1;
  newMessages: boolean[] = [];

  constructor(private ChatapiService: ChatApiService, private googleService: GoogleAuthService) { }

  ngOnInit(): void {
    this.googleService.loggedIn$.subscribe(loggedIn => {this.isLoggedIn = loggedIn});
    this.ChatapiService.getNewMessagesUpdates()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        console.log('update');
        console.log(data);
        this.newMessages = data;
        this.users = this.ChatapiService.getUsers();
        this.messages = this.ChatapiService.getMessages();
        this.avatars = this.ChatapiService.getAvatars();
        this.usernames = this.ChatapiService.getUsernames();
      });
  }

  receieState(state: boolean) {
    this.isConversation = state;
    this.newMessages[this.conversationId] = false;
  }

  receiveMesage(message: string) {
    this.messages[this.conversationId] = message;
  }
}
