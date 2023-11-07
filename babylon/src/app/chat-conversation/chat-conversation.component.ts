import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.css']
})
export class ChatConversationComponent {

  @Input()
  user!: string;
  @Input()
  avatar!: string;

}
