import { homeComponent } from './home/home.component';
import { sellComponent } from './sell/sell.component';
import { loginComponent } from './login/login.component';
import { registerComponent } from './register/register.component';
import { postingComponent } from './posting/posting.component';
import { newMessageComponent } from './newMessage/newMessage.component';
import { offerMessageComponent } from './offerMessage/offerMessage.component';
import { yourMessagesComponent } from './yourMessages/yourMessages.component';
import { searchResComponent } from './searchRes/searchRes.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '',component: loginComponent },
  { path: 'register',component: registerComponent },
  { path: 'home',component: homeComponent },
  { path: 'sell',component: sellComponent },
  { path: 'posting/:id',component: postingComponent },
  { path: 'message/:id/:productId',component: newMessageComponent },
  { path: 'message/:id',component: offerMessageComponent },
  { path: 'messages',component: yourMessagesComponent },
  { path: 'searchThis/:content',component: searchResComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }