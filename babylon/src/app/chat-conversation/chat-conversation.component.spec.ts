// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ChatConversationComponent } from './chat-conversation.component';
// import { SocialAuthService } from '@abacritt/angularx-social-login';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { WebsocketService } from '../chat-api.service';

// describe('ChatConversationComponent', () => {
//   let component: ChatConversationComponent;
//   let fixture: ComponentFixture<ChatConversationComponent>;
//   let webSocketService: WebsocketService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientModule, FormsModule],
//       declarations: [ChatConversationComponent],
//       providers: [
//         { provide: 'SocialAuthServiceConfig', useValue: {} },
//         { provide: SocialAuthService, useValue: {} },
//         WebsocketService
//       ]
//     });
//     fixture = TestBed.createComponent(ChatConversationComponent);
//     component = fixture.componentInstance;
//     webSocketService = TestBed.inject(WebsocketService);
//     fixture.detectChanges();
//   });

//   afterEach(() => {
//     fixture.destroy();
//   })

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should set correct companion', () => {
//     component.username = 'admin';
//     component.setCompanion(1);
//     expect(component.user).toEqual('Administrator');
//   });
// });
