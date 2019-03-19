import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // <-- import FormsModule.
import { AppRoutingModule } from './app-routing.module';
import { homeComponent } from './home/home.component';
import { loginComponent } from './login/login.component';
import { registerComponent } from './register/register.component';
import { sellComponent } from './sell/sell.component';
import { postingComponent } from './posting/posting.component';
import { newMessageComponent } from './newMessage/newMessage.component';
import { offerMessageComponent } from './offerMessage/offerMessage.component';
import { yourMessagesComponent } from './yourMessages/yourMessages.component';
import { searchResComponent } from './searchRes/searchRes.component';
import { OrderModule } from 'ngx-order-pipe';



@NgModule({
  declarations: [AppComponent, homeComponent, sellComponent, loginComponent, registerComponent, postingComponent, newMessageComponent, offerMessageComponent, yourMessagesComponent, searchResComponent],
  imports: [BrowserModule, AppRoutingModule,HttpClientModule,
    FormsModule, OrderModule],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }