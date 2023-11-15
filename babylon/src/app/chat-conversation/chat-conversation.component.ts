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

  @Input()
  user!: string;
  @Input()
  avatar!: string;
  @Input()
  username!: string;

  @Output()
  dataToParent = new EventEmitter<boolean>();

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

      this.websocketService.connect(this.wsUrl+conversationId+'/', this.googleService.getAuthToken());
      this.messageSubscription = this.websocketService.receiveMessage().subscribe(
        (message) => {
          console.log('Received message:', message);
          this.messages.push(new Message(message.id, message.text, message.timestamp, parseInt(message.sender)));
          // Обработка полученного сообщения
        },
        (error) => {
          console.error('Error in WebSocket connection:', error);
          // Обработка ошибки
        }
      );

    });
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
    this.websocketService.sendMessage(this.message)
    this.message = '';
  }

  sendConversationState() {
    this.dataToParent.emit(false);
  }

  ngOnDestroy() {
    this.websocketService.closeConnection();
  }

}
