import { Component, OnInit } from '@angular/core';
import { ChatApiService } from '../chat-api.service';
import { GoogleAuthService } from '../google-auth.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  
  users: string[] = [];
  messages: string[] = [];
  avatars: string[] = [];
  usernames: string[] = [];
  isConversation: boolean = false;
  conversationId: number = -1;

  constructor(private ChatapiService: ChatApiService, private googleService: GoogleAuthService) { }

  isLoggedIn: boolean = false;
  //for api
  // ngOnInit(): void {
  //   this.ChatapiService.getUsers().subscribe(data => {
  //     this.users = data.chats;
  //   });
  // }

  ngOnInit(): void {
    this.googleService.loggedIn$.subscribe(loggedIn => {this.isLoggedIn = loggedIn});
    this.users = this.ChatapiService.getUsers();
    this.messages = this.ChatapiService.getMessages();
    this.avatars = this.ChatapiService.getAvatars();
    this.usernames = this.ChatapiService.getUsernames();
  }

  receieState(state: boolean) {
    this.isConversation = state;
  }
}
