import { Component, OnInit } from '@angular/core';
import { ChatApiService } from '../chat-api.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  
  users: string[] = [];
  messages: string[] = [];
  avatars: string[] = [];

  constructor(private ChatapiService: ChatApiService) { }

  //for api
  // ngOnInit(): void {
  //   this.ChatapiService.getUsers().subscribe(data => {
  //     this.users = data.chats;
  //   });
  // }

  ngOnInit(): void {
    this.users = this.ChatapiService.getUsers();
    this.messages = this.ChatapiService.getMessages();
    this.avatars = this.ChatapiService.getAvatars();
  }
}
