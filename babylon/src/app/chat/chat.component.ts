import { Component, OnInit } from '@angular/core';
import { ChatApiService } from '../chat-api.service';
import { GoogleAuthService } from '../google-auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  
  users: string[] = [];
  messages: string[] = [];
  avatars: string[] = [];

  selectedChatIndex: number | null = null; //для того щоб заходити в переписку
  chatContent: string[] = [];
  newMessage: string = ''; // нове повідомлення


  constructor(private ChatapiService: ChatApiService, private googleService: GoogleAuthService, private router: Router) { }

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
    if (this.selectedChatIndex !== null) {
      this.messages = this.ChatapiService.getMessages(this.selectedChatIndex);
    };
    //this.messages = this.ChatapiService.getMessages();
    this.avatars = this.ChatapiService.getAvatars();
  }

  //вибор чату за індексом
  selectChat(chatIndex: number) {
    this.selectedChatIndex = chatIndex;
    this.chatContent = this.ChatapiService.getMessages(chatIndex);
  }


}