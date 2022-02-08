import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserComponent } from './user/user.component';
import { ContentComponent } from './content/content.component';
import { ChatComponent } from './chat/chat.component';
import { ElementsComponent } from './elements/elements.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './Service/UserService';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: 'chat/:id', component: ChatComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserComponent,
    ContentComponent,
    ChatComponent,
    ElementsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
