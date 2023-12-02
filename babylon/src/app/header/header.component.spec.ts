// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { HeaderComponent } from './header.component';
// import { SocialAuthService } from '@abacritt/angularx-social-login';
// import { HttpClientModule } from '@angular/common/http';
// import { By } from '@angular/platform-browser';
// import { of } from 'rxjs';
// import { RouterLink } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import {  GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

// describe('HeaderComponent', () => {
//   let component: HeaderComponent;
//   let fixture: ComponentFixture<HeaderComponent>;
//   let authService: SocialAuthService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientModule, RouterLink, RouterTestingModule, GoogleSigninButtonModule],
//       declarations: [HeaderComponent],
//       providers: [
//         { provide: 'SocialAuthServiceConfig', useValue: {} },
//         { provide: SocialAuthService, useValue: {
//           authState: of(true),
//         } },
//       ]
//     });
//     fixture = TestBed.createComponent(HeaderComponent);
//     component = fixture.componentInstance;
//     authService = TestBed.inject(SocialAuthService);
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should have links to Home, Lessons, and Tweets pages', () => {
//     const links = fixture.debugElement.queryAll(By.css('.toolbar a'));
//     expect(links.length).toBe(3);
//     expect(links[0].nativeElement.getAttribute('routerLink')).toBe('/Home');
//     expect(links[0].nativeElement.innerText.trim()).toBe('Home');
//     expect(links[1].nativeElement.getAttribute('routerLink')).toBe('/Lessons');
//     expect(links[1].nativeElement.innerText.trim()).toBe('Lessons');
//     expect(links[2].nativeElement.getAttribute('routerLink')).toBe('/Tweets');
//     expect(links[2].nativeElement.innerText.trim()).toBe('Tweets');
//   });
// });
