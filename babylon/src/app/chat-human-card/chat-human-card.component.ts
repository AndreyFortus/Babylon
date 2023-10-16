import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-human-card',
  templateUrl: './chat-human-card.component.html',
  styleUrls: ['./chat-human-card.component.css']
})
export class ChatHumanCardComponent {
  @Input()
  user!: string;
  @Input()
  message!: string;
  @Input()
  avatar!: string;
}
