import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-human-card',
  templateUrl: './chat-human-card.component.html',
  styleUrls: ['./chat-human-card.component.css']
})
export class ChatHumanCardComponent implements OnInit{
  @Input()
  user!: string;
  @Input()
  message!: string;
  @Input()
  avatar!: string;
  @Input()
  username!: string;
  @Input()
  isNewMessage!: boolean;

  ngOnInit(): void {
    if (this.username == 'admin') {
      this.user = 'Administrator';
      this.avatar = 'https://icons.veryicon.com/png/o/commerce-shopping/wangdianbao-icon-monochrome/administrators-6.png';
    }
  }
}
