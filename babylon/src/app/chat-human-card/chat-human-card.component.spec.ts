import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHumanCardComponent } from './chat-human-card.component';

describe('ChatHumanCardComponent', () => {
  let component: ChatHumanCardComponent;
  let fixture: ComponentFixture<ChatHumanCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatHumanCardComponent]
    });
    fixture = TestBed.createComponent(ChatHumanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set correct admin user', () => {
    component.username = 'admin';
    component.ngOnInit();
    expect(component.user).toEqual('Administrator');
    expect(component.avatar).toEqual('https://icons.veryicon.com/png/o/commerce-shopping/wangdianbao-icon-monochrome/administrators-6.png');
  });
});
