import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-task',
  templateUrl: './yourMessages.component.html',
  styleUrls: ['./yourMessages.component.css']
})
export class yourMessagesComponent implements OnInit {
  navDisplay:any;
  clicked:any;
  offers:any;
  user:any;
  newSearch:any;
  constructor(private _httpService: HttpService, private route: ActivatedRoute, private routing: Router) { }

  ngOnInit() {
    this.checkLog();
    this.navDisplay = "none";
    this.clicked = 0;
    this.getMessages();
    this.newSearch = {content: ""};
  }
  clickedNav(){
    if(this.clicked === 0){
      this.navDisplay = "block";
      this.clicked = 1;
    }else{
      this.navDisplay = "none";
      this.clicked = 0;
    }
  }
  checkLog(){
    this._httpService.checkLogin().subscribe(data => {
      if(data['Message'] === "Error"){
        this.logoutClick();
      }else{
        this.user = data;
      }
    })
  }
  logoutClick(){
    this._httpService.LogoutUser().subscribe(data => {
      this.routing.navigate(['/']);
    })
  }
  getMessages(){
    this._httpService.getUserMessages().subscribe(data=>{
      this.offers = data;
    })
  }

  searchClick(){
    this.routing.navigate(['/searchThis/'+this.newSearch.content]);
    this.newSearch = {content: ""};
  }
}
