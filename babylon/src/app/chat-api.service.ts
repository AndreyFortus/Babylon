import { Injectable } from '@angular/core';
import { GoogleAuthService } from './google-auth.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, mergeMap, catchError, map, of, Subject, interval, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {
  private url = 'http://127.0.0.1:8000/api/conversations/'
  private username = '';
  private users:string[] = [];
  private messages:string[] = [];
  private usernames:string[] = [];
  private avatars:string[] = [];

  private prevMessages: string[] = [];

  private userListSubject = new Subject<boolean[]>();

  constructor(private googleService: GoogleAuthService, private http: HttpClient) {
    this.googleService.username$.subscribe(username => {
          this.username = username;
        });
    googleService.loggedIn$.subscribe(loggedIn => {
      if (loggedIn){
        this.getUserList();
        interval(10000).subscribe(() => {
          this.getUserList();
        });
      }
    });
  }

  private getUserList() {
    this.prevMessages = this.messages;
    
    this.users = [];
    this.usernames = [];
    this.avatars = [];
    this.messages = [];
    this.http.get<any[]>(this.url, this.getHeaders()).subscribe((response: any[]) => {
      for (let user of response) {
        if (this.username === user.initiator.username) {
        this.users.push(user.receiver.first_name+' '+user.receiver.last_name);
        this.usernames.push(user.receiver.username);
        this.avatars.push(user.receiver.profile_picture);
        } else if (this.username === user.receiver.username) {
          this.users.push(user.initiator.first_name+' '+user.initiator.last_name);
          this.usernames.push(user.initiator.username);
          this.avatars.push(user.initiator.profile_picture);
        }
        this.messages.push(user.last_message ? user.last_message.text : '');
      }

      let newMessages = this.getNewMessages(this.prevMessages, this.messages);
      if (!this.isFalseArray(newMessages) || this.prevMessages.length == 0) {
        console.log('new message update!!!');
        this.setNewMessages(newMessages);
      }
    });
  }

  getNewMessagesUpdates() {
    return this.userListSubject.asObservable();
  }

  setNewMessages(newMessages: boolean[]) {
    this.userListSubject.next(newMessages);
  }

  private getNewMessages(arr1: any[], arr2: any[]) {
    let newMessages: boolean[] = [];
    for (let i = 0; i<arr2.length; i++) {
      newMessages[i] = false;
    }

    for (let i = 0; i < arr2.length; i++) {
      if (arr1[i] !== arr2[i]) {
        newMessages[i] = true;
      }
    }

    return newMessages;

  }

  private isFalseArray(arr: boolean[]) {
    let result = true;
    for (let elem of arr) {
      if (elem) {
        result = false;
      }
    }
    console.log('is false array', result);
    return result;
  }

  getUsers(): string[] {
    // let users: string[] = ["Name Surname", "Name Surname", "Name Surname", "Name Surname", "Name Surname", "Name Surname", "Name Surname", "Name Surname"]
    // let users: string[] = ["Sarah Johnson", "Alex Smith", "Олександр Іваненко"]
    return this.users;
  }

  getMessages(): string[] {
    // let messages: string[] = ["Message", "Message", "Message", "Message", "Message", "Message", "Message", "Message", ]
    // let messages: string[] = ["Hi there! I just completed a challenging grammar quiz...", "Hey, I'm stuck on a vocabulary exercise...", "Привіт, зараз проходжу 3 урок та..."]
    return this.messages;
  }

  getAvatars(): string[] {
    // let avatars: string[] = ["https://th-thumbnailer.cdn-si-edu.com/5V-xOO-B6H14VTVruDbqnMvmmE0=/fit-in/1072x0/filters:focal(342x433:343x434)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/e4/af/e4afdbe6-59c0-4a6b-8112-8b30e274d9a0/2009-49519-h-floresiensis-jgurche_web.jpg", "https://th-thumbnailer.cdn-si-edu.com/5V-xOO-B6H14VTVruDbqnMvmmE0=/fit-in/1072x0/filters:focal(342x433:343x434)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/e4/af/e4afdbe6-59c0-4a6b-8112-8b30e274d9a0/2009-49519-h-floresiensis-jgurche_web.jpg", "https://th-thumbnailer.cdn-si-edu.com/5V-xOO-B6H14VTVruDbqnMvmmE0=/fit-in/1072x0/filters:focal(342x433:343x434)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/e4/af/e4afdbe6-59c0-4a6b-8112-8b30e274d9a0/2009-49519-h-floresiensis-jgurche_web.jpg", "https://th-thumbnailer.cdn-si-edu.com/5V-xOO-B6H14VTVruDbqnMvmmE0=/fit-in/1072x0/filters:focal(342x433:343x434)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/e4/af/e4afdbe6-59c0-4a6b-8112-8b30e274d9a0/2009-49519-h-floresiensis-jgurche_web.jpg", "https://th-thumbnailer.cdn-si-edu.com/5V-xOO-B6H14VTVruDbqnMvmmE0=/fit-in/1072x0/filters:focal(342x433:343x434)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/e4/af/e4afdbe6-59c0-4a6b-8112-8b30e274d9a0/2009-49519-h-floresiensis-jgurche_web.jpg", "https://th-thumbnailer.cdn-si-edu.com/5V-xOO-B6H14VTVruDbqnMvmmE0=/fit-in/1072x0/filters:focal(342x433:343x434)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/e4/af/e4afdbe6-59c0-4a6b-8112-8b30e274d9a0/2009-49519-h-floresiensis-jgurche_web.jpg", "https://th-thumbnailer.cdn-si-edu.com/5V-xOO-B6H14VTVruDbqnMvmmE0=/fit-in/1072x0/filters:focal(342x433:343x434)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/e4/af/e4afdbe6-59c0-4a6b-8112-8b30e274d9a0/2009-49519-h-floresiensis-jgurche_web.jpg", "https://th-thumbnailer.cdn-si-edu.com/5V-xOO-B6H14VTVruDbqnMvmmE0=/fit-in/1072x0/filters:focal(342x433:343x434)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/e4/af/e4afdbe6-59c0-4a6b-8112-8b30e274d9a0/2009-49519-h-floresiensis-jgurche_web.jpg", ]
    // let avatars: string[] = ["https://assets.petco.com/petco/image/upload/f_auto,q_auto/135690-Center-1", "https://hips.hearstapps.com/hmg-prod/images/domestic-cat-lies-in-a-basket-with-a-knitted-royalty-free-image-1592337336.jpg?crop=0.670xw:1.00xh;0.247xw,0&resize=1200:*", "https://singersroom.com/wp-content/uploads/2023/02/17-Best-Songs-About-the-Sun-and-Sunshine-to-Brighten-Your-Day-scaled.jpg"]
    return this.avatars;
  }

  getUsernames(): string[] {
    // let usernames = ['dwouijeqmn', 'tevmsgsiag', 'sotpkmurfy', 'ybrhblyybo'];
    return this.usernames;
  }

  startConversation(username: string): Observable<{ conversationId: number, messages: Message[] }> {
    return this.http.post(`${this.url}start/`, { "username": username }, this.getHeaders())
      .pipe(
        mergeMap((response: any) => {
          const conversationId = response.conversation_id;
          console.log(conversationId);
          return this.getConversationMessages(conversationId)
            .pipe(
              map(messages => ({ conversationId, messages })),
              catchError(error => {
                console.error('Error getting conversation messages:', error);
                return of({ conversationId, messages: [] });
              })
            );
        }),
        catchError(error => {
          console.error('Error starting conversation:', error);
          return of({ conversationId: 0, messages: [] });
        })
      );
  }

  getConversationMessages(id: number): Observable<Message[]> {
    return this.http.get(`${this.url}${id}/`, this.getHeaders())
      .pipe(
        map((response: any) => {
          const messages: Message[] = [];
          for (const message of response.message_set) {
            messages.push(new Message(message.id, message.text, message.timestamp, parseInt(message.sender)));
          }
          return messages;
        }),
        catchError(error => {
          console.error('Error getting conversation messages:', error);
          return of([]);
        })
      );
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders().set('Authorization', `Token ${this.googleService.getAuthToken()}`)
    };
  }
}


@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket$!: WebSocketSubject<any>;

  constructor() {}

  // Инициализация веб-сокета с передачей токена в заголовке
  connect(url: string, token: string): void {
    this.socket$ = webSocket({
      url: url+'?protocol=Token%20'+token,
      deserializer: (msg) => JSON.parse(msg.data),
      serializer: (msg) => JSON.stringify(msg),
      openObserver: {
        next: () => {
          console.log('WebSocket connection established');
          // Здесь вы можете выполнять дополнительные действия при успешном подключении
        },
      },
      closingObserver: {
        next: () => {
          console.log('WebSocket connection closing');
          // Здесь вы можете выполнять дополнительные действия при закрытии подключения
        },
      },
    });
  }

  // Метод для отправки сообщения через веб-сокет
  sendMessage(message: any): void {
    console.log('message send');
    this.socket$.next({'message': message});
  }

  // Метод для получения сообщений от сервера через веб-сокет
  receiveMessage(): Observable<any> {
    return this.socket$.asObservable();
  }

  // Метод для отключения от веб-сокета
  closeConnection(): void {
    this.socket$.complete();
    console.log('WebSocket connection closed');
    // Здесь вы можете выполнять дополнительные действия при закрытии подключения
  }
}

export class Message {
  id: number = 0;
  text: string = '';
  timestamp: string = '';
  convertedTimestamp: string = '';
  sender: number = 0;

  constructor(id: number, text: string, timestamp: string, sender: number) {
    this.id = id;
    this.text = text;
    this.timestamp = timestamp;
    this.convertedTimestamp = this.getFormattedTimestamp(timestamp);
    this.sender = sender;
  }

  private getFormattedTimestamp(dateString: string): string {
    const date = new Date(dateString);
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd HH:mm') || ''; // Обрабатываем ситуацию, когда форматирование не удалось
  }

  getTime() {
    const date = new Date(this.timestamp);
    const datePipe = new DatePipe('en-US');
    return parseFloat(datePipe.transform(date, 'ss.SSS') || '');
  }

}


