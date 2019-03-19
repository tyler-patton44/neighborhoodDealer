import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-task',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class homeComponent implements OnInit {
  navDisplay:any;
  clicked:any;
  latitude:any;
  longitude:any;
  products:any;
  newSearch:any;
  constructor(private _httpService: HttpService, private route: ActivatedRoute, private routing: Router) { }

  ngOnInit() {
    this.checkLog();
    this.navDisplay = "none";
    this.clicked = 0;
    this.getLocation();
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
      }
    })
  }
  logoutClick(){
    this._httpService.LogoutUser().subscribe(data => {
      this.routing.navigate(['/']);
    })
  }
  getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          this.longitude = position.coords.longitude;
          this.latitude = position.coords.latitude;
          this.getProducts();
        });
    } else {
       alert("No support for geolocation");
    }
  }
  getProducts(){
    this._httpService.getProducts().subscribe(data => {
      if(data['Message'] === "Error"){
        this.logoutClick();
      }
      else{
        this.products = [];

        for(var prod in data){
          var dLat =  this.toRadians(data[prod]['latitude'] - this.latitude);
          var dLon =  this.toRadians(data[prod]['longitude'] - this.longitude);
          var lat1 = this.toRadians(this.latitude);
          var lat2 = this.toRadians(data[prod]['latitude']);

          var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
          var d = 3958.8 * 2 * Math.asin(Math.sqrt(a));

          if(d <= 30){
              this.products.push(data[prod]);
          }
        }
    }
    })
  }
  toRadians(angle){
    return Math.PI * angle / 180.0;
  }

  searchClick(){
    this.routing.navigate(['/searchThis/'+this.newSearch.content]);
    this.newSearch = {content: ""};
  }
}
