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
  }
}
