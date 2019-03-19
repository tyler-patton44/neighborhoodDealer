import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams, HttpRequest, HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
@Component({
  selector: 'app-task',
  templateUrl: './newMessage.component.html',
  styleUrls: ['./newMessage.component.css']
})
export class newMessageComponent implements OnInit {
  navDisplay:any;
  clicked:any;
  product:any;
  newMessage:any;
  imageReady:any;
  errorMessage:any;
  userId:any;
  newSearch:any;
  constructor(private _httpService: HttpService, private route: ActivatedRoute, private routing: Router) { }

  ngOnInit() {
    this.checkLog();
    this.newMessage = {content: "", image: ""};
    this.getProduct();
    this.newSearch = {content: ""};
  }

  //=====================================================
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

  clickedNav(){
    if(this.clicked === 0){
      this.navDisplay = "block";
      this.clicked = 1;
    }else{
      this.navDisplay = "none";
      this.clicked = 0;
    }
  }

  getProduct(){
    this.route.params.subscribe(res=>{
      this.userId = res.id;
      this._httpService.getOneProduct(res.productId).subscribe(data => {
        if(data['Message'] === "Error"){
          this.logoutClick();
        }
        this.product = data;
      })
    })
  }

  changeListener($event) : void {
    if($event.target.files[0].type.includes('image')){
    this.imageReady = "#4c9f7f";
    this.readThis($event.target);
    }
    else{
      alert("Not a valid image");
    }
  }
  
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
     this.newMessage.image = myReader.result;
    }
    myReader.readAsDataURL(file);
  }
  onSubmit(){
    this.errorMessage = null;
      let observable = this._httpService.firstMessage(this.newMessage, this.userId, this.product.productId);
      observable.subscribe(data => {
        if(data['Message'] != "Success"){
          if(data['content']){
            this.errorMessage = data['content']['errors'];
          }
          if(data['Message'] === "Error"){
            this.logoutClick();
          }
        }else{
          this.newMessage = {content: "", image: ""};
          this.routing.navigate(['/home']);
      }
      })
  }
  //=====================================================
  searchClick(){
    this.routing.navigate(['/searchThis/'+this.newSearch.content]);
    this.newSearch = {content: ""};
  }
}
