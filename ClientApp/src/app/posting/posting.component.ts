import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-task',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.css']
})
export class postingComponent implements OnInit {
  navDisplay:any;
  clicked:any;
  product:any;
  user:any;
  offers:any;
  isOffer:any;
  offerId:any;
  newSearch:any;
  constructor(private _httpService: HttpService, private route: ActivatedRoute, private routing: Router) { }

  ngOnInit() {
    this.checkLog();
    this.navDisplay = "none";
    this.clicked = 0;
    this.getProduct();
    this.isOffer = false;
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
  getProduct(){
    this.route.params.subscribe(res=>{
      this._httpService.getOneProduct(res.id).subscribe(data => {
        if(data['Message'] === "Error"){
          this.logoutClick();
        }
        this.product = data;
        this.getMessages();
      })
    })
  }

  getMessages(){
    this._httpService.getUserMessages().subscribe(data=>{
      this.offers = data;
      this.checkIfMessages();
    })
  }
  checkIfMessages(){
    for(var prod in this.offers){
      if(this.offers[prod].product.productId === this.product.productId){
        this.isOffer = true;
        this.offerId = this.offers[prod].offerId;
      }
    }
  }

  searchClick(){
    this.routing.navigate(['/searchThis/'+this.newSearch.content]);
    this.newSearch = {content: ""};
  }
}
