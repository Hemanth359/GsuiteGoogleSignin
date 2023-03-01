import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DemoComponent } from './demo/demo.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './_components';

import {
  GoogleLoginProvider,
  SocialLoginModule,
  FacebookLoginProvider,
  // AmazonLoginProvider,
  // VKLoginProvider,
  MicrosoftLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [AppComponent, NavbarComponent, DemoComponent, HomeComponent, LoginComponent,RegisterComponent,AlertComponent],
  imports: [BrowserModule, FormsModule, SocialLoginModule, ReactiveFormsModule,HttpClientModule,appRoutingModule,],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '222456991365-f3ltlkb9utlauipdaq0shode452uh39i.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('561602290896109'),
          },
          // {
          //   id: AmazonLoginProvider.PROVIDER_ID,
          //   provider: new AmazonLoginProvider(
          //     'amzn1.application-oa2-client.f074ae67c0a146b6902cc0c4a3297935'
          //   ),
          // },
          // {
          //   id: VKLoginProvider.PROVIDER_ID,
          //   provider: new VKLoginProvider('7624815'),
          // },
          {
            id: MicrosoftLoginProvider.PROVIDER_ID,
            provider: new MicrosoftLoginProvider(
              '0611ccc3-9521-45b6-b432-039852002705'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        
        // provider used to create fake backend
        fakeBackendProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
