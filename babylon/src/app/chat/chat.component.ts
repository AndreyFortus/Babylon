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
  username!: string;
  private ngUnsubscribe = new Subject();
  users: string[] = [];
  messages: string[] = [];
  avatars: string[] = [];
  usernames: string[] = [];
  isConversation: boolean = false;
  isWrondUsername: boolean = false;
  conversationId: number = -1;
  newMessages: boolean[] = [];
  searchBar: string = '';

  constructor(private ChatapiService: ChatApiService, private googleService: GoogleAuthService) { }

  ngOnInit(): void {
    this.googleService.loggedIn$.subscribe(loggedIn => {this.isLoggedIn = loggedIn});
    this.googleService.username$.subscribe(username => {this.username = username});
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

  startChat() {
    
    if ((this.searchBar.length == 10 && this.searchBar != this.username || this.searchBar=='admin')){
      this.ChatapiService.startConversation(this.searchBar).subscribe(
        result => {
          // Обработка успешного старта чата
          this.usernames.push(this.searchBar);
          this.conversationId = this.usernames.length-1;
          this.isConversation = true;
          this.searchBar = '';
        },
        error => {
          // Обработка ошибок
          if (error.status === 404) {
            // Ошибка 404: пользователь не найден
            console.error('User not found in the database');
            this.isWrondUsername = true;
            setTimeout(() => this.isWrondUsername=false, 1000);
          } else {
            // Другие ошибки
            console.error('Error starting conversation:', error);
          }
          // Не устанавливать isConversation в true в случае ошибки
        }
      );
      // this.usernames.push(this.searchBar);
      // this.conversationId = this.usernames.length-1;
      // this.isConversation = true;
      // this.searchBar = '';
    }
  }

  receieState(state: boolean) {
    this.isConversation = state;
    this.newMessages[this.conversationId] = false;
  }

  receiveMesage(message: string) {
    this.messages[this.conversationId] = message;
  }
}
