import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ChatApiService, Message, WebsocketService } from '../chat-api.service';
import { GoogleAuthService } from '../google-auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.css']
})
export class ChatConversationComponent implements OnInit, OnDestroy{

  // @Input()
  user!: string;
  // @Input()
  avatar!: string;
  @Input()
  username!: string;

  @Output()
  dataToParent = new EventEmitter<boolean>();
  @Output()
  lastMessage = new EventEmitter<string>();

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  messages: Message[] = [];
  conversationId!: number;
  message: string = '';
  private wsUrl = 'ws://127.0.0.1:8080/ws/chat/'
  private messageSubscription!: Subscription;
  id!: number;

  constructor(private chatService: ChatApiService, private websocketService: WebsocketService, private googleService: GoogleAuthService) {}

  ngOnInit(): void {
    console.log('init')
    this.googleService.id$.subscribe(id => {this.id = id; console.log(this.id)});
    this.chatService.startConversation(this.username).subscribe(result => {
      console.log('chat with '+this.username);
      const { conversationId, messages } = result;
      console.log(conversationId);
      this.messages = messages.reverse();
      this.conversationId = conversationId;
      this.setCompanion(this.conversationId);

      this.websocketService.connect(this.wsUrl+conversationId+'/', this.googleService.getAuthToken());
      this.messageSubscription = this.websocketService.receiveMessage().subscribe(
        (message) => {
          console.log('Received message:', message);
          this.messages.push(new Message(message.id, message.text, message.timestamp, parseInt(message.sender)));
          this.sendLastMessage(message.text);
          // Обработка полученного сообщения
        },
        (error) => {
          console.error('Error in WebSocket connection:', error);
          // Обработка ошибки
        }
      );

    });
  }

  setCompanion(id: number) {
    if (this.username == 'admin') {
      this.user = 'Administrator';
      this.avatar = 'https://icons.veryicon.com/png/o/commerce-shopping/wangdianbao-icon-monochrome/administrators-6.png'
    }
    else {
      this.chatService.getCompanion(id).subscribe(response => {
        console.log('sdasdasd' ,response);
        if (this.id == response.initiator.id) {
          this.user = `${response.receiver.first_name} ${response.receiver.last_name}`;
          this.avatar = response.receiver.profile_picture;
          // this.username = response.receiver.username;
        }
        else if (this.id == response.receiver.id) {
          this.user = `${response.initiator.first_name} ${response.initiator.last_name}`;
          this.avatar = response.initiator.profile_picture;
          // this.username = response.initiator.username;
        }
      })
  }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }

  sendMessage() {
    if (this.message != ''){
      this.websocketService.sendMessage(this.message);
      this.sendLastMessage(this.message);
      this.message = '';
    }
  }

  sendConversationState() {
    this.dataToParent.emit(false);
  }

  sendLastMessage(message: string) {
    console.log('last message', message);
    this.lastMessage.emit(message);
  }

  ngOnDestroy() {
    this.websocketService.closeConnection();
    if (this.messages.length > 0){
      if (this.messages[this.messages.length-1].sender != this.id) {
        console.log()
        this.chatService.updateReadStatus(this.conversationId, true);
      }
    }
  }

}
