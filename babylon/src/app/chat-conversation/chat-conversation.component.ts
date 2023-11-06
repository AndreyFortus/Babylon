import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatApiService } from '../chat-api.service';

@Component({
  selector: 'app-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.css']
})
export class ChatConversationComponent implements OnInit {
  chatId: number = 0;
  messages: string[] = [];
  userResponses: string[] = [];

  constructor(private route: ActivatedRoute, private chatApiService: ChatApiService) {
    this.route.params.subscribe(params => {
      this.chatId = +params['chatId']; // Отримуємо chatId з параметрів маршруту
    });
  }

  ngOnInit() {
    this.messages = this.chatApiService.getMessages(this.chatId); // Отримуємо повідомлення для вибраного чату
    this.userResponses = this.chatApiService.getUserResponses(this.chatId);
  }
}

