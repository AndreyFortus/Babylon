import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {
  private url = ''

  constructor(private http: HttpClient) { }

  //for api 
  // getUsers(): Observable<any> {
  //   // return this.http.get<any>(`${this.url}/users`);
  // }

  getUsers(): string[] {
    // let users: string[] = ["Name Surname", "Name Surname", "Name Surname", "Name Surname", "Name Surname", "Name Surname", "Name Surname", "Name Surname"]
    let users: string[] = ["Sarah Johnson", "Alex Smith", "Олександр Іваненко"]
    return users;
  }

  getMessages(chatId: number): string[] {
    // Повертаємо повідомлення для конкретного чату за його chatId
    // В цьому прикладі повідомлення відповідають індексу чату, але ви можете реалізувати більш складну логіку для вибору повідомлень за chatId.
    let messages: string[] = [
      "Hi there! I just completed a challenging grammar quiz...",
      "Hey, I'm stuck on a vocabulary exercise...",
      "Привіт, зараз проходжу 3 урок та..."
    ];
  
    if (chatId >= 0 && chatId < messages.length) {
      return [messages[chatId]]; // Повертаємо лише одне повідомлення за вказаним chatId
    }
  
    return []; // Якщо chatId не відповідає жодному чату, повертаємо пустий масив
  }

  getUserResponses(chatId: number): string[] {
    let userResponses: string[] = 
      [
        "Це відповідь користувача на перше повідомлення",
        "Дякую за вашу допомогу!",
        "Продовжимо навчання разом"
      ];
      if (chatId >= 0 && chatId < userResponses.length) {
        return [userResponses[chatId]]; // Повертаємо лише одне повідомлення за вказаним chatId
      }
    
      return []; // Якщо chatId не відповідає жодному чату, повертаємо пустий масив
  }

  getAvatars(): string[] {
    // let avatars: string[] = ["https://th-thumbnailer.cdn-si-edu.com/5V-xOO-B6H14VTVruDbqnMvmmE0=/fit-in/1072x0/filters:focal(342x433:343x434)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/e4/af/e4afdbe6-59c0-4a6b-8112-8b30e274d9a0/2009-49519-h-floresiensis-jgurche_web.jpg", "https://th-thumbnailer.cdn-si-edu.com/5V-xOO-B6H14VTVruDbqnMvmmE0=/fit-in/1072x0/filters:focal(342x433:343x434)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/e4/af/e4afdbe6-59c0-4a6b-8112-8b30e274d9a0/2009-49519-h-floresiensis-jgurche_web.jpg", "https://th-thumbnailer.cdn-si-edu.com/5V-xOO-B6H14VTVruDbqnMvmmE0=/fit-in/1072x0/filters:focal(342x433:343x434)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/e4/af/e4afdbe6-59c0-4a6b-8112-8b30e274d9a0/2009-49519-h-floresiensis-jgurche_web.jpg", "https://th-thumbnailer.cdn-si-edu.com/5V-xOO-B6H14VTVruDbqnMvmmE0=/fit-in/1072x0/filters:focal(342x433:343x434)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/e4/af/e4afdbe6-59c0-4a6b-8112-8b30e274d9a0/2009-49519-h-floresiensis-jgurche_web.jpg", "https://th-thumbnailer.cdn-si-edu.com/5V-xOO-B6H14VTVruDbqnMvmmE0=/fit-in/1072x0/filters:focal(342x433:343x434)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/e4/af/e4afdbe6-59c0-4a6b-8112-8b30e274d9a0/2009-49519-h-floresiensis-jgurche_web.jpg", "https://th-thumbnailer.cdn-si-edu.com/5V-xOO-B6H14VTVruDbqnMvmmE0=/fit-in/1072x0/filters:focal(342x433:343x434)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/e4/af/e4afdbe6-59c0-4a6b-8112-8b30e274d9a0/2009-49519-h-floresiensis-jgurche_web.jpg", "https://th-thumbnailer.cdn-si-edu.com/5V-xOO-B6H14VTVruDbqnMvmmE0=/fit-in/1072x0/filters:focal(342x433:343x434)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/e4/af/e4afdbe6-59c0-4a6b-8112-8b30e274d9a0/2009-49519-h-floresiensis-jgurche_web.jpg", "https://th-thumbnailer.cdn-si-edu.com/5V-xOO-B6H14VTVruDbqnMvmmE0=/fit-in/1072x0/filters:focal(342x433:343x434)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/e4/af/e4afdbe6-59c0-4a6b-8112-8b30e274d9a0/2009-49519-h-floresiensis-jgurche_web.jpg", ]
    let avatars: string[] = ["https://assets.petco.com/petco/image/upload/f_auto,q_auto/135690-Center-1", "https://hips.hearstapps.com/hmg-prod/images/domestic-cat-lies-in-a-basket-with-a-knitted-royalty-free-image-1592337336.jpg?crop=0.670xw:1.00xh;0.247xw,0&resize=1200:*", "https://singersroom.com/wp-content/uploads/2023/02/17-Best-Songs-About-the-Sun-and-Sunshine-to-Brighten-Your-Day-scaled.jpg"]
    return avatars;
  }
}