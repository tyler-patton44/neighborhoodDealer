import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams, HttpRequest, HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
@Component({
  selector: 'app-task',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class sellComponent implements OnInit {
  navDisplay:any;
  clicked:any;
  makeProd:any;
  previewImage:any;
  errorTitle:any;
  errorPrice:any;
  errorCity:any;
  errorDesc:any;
  errorImage:any;
  products:any;
  newSearch:any;
  constructor(private _httpService: HttpService, private route: ActivatedRoute, private routing: Router) { }

  ngOnInit() {
    this.checkLog();
    this.getLocation();
    this.makeProd = {title: "", price: null, image: "", longitude: null, latitude: null, city: "", desc: ""};
    this.navDisplay = "none";
    this.clicked = 0;
    this.getProducts();
    this.newSearch = {content: ""};
  }

  changeListener($event) : void {
    if($event.target.files[0].type.includes('image')){
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
     this.makeProd.image = myReader.result;
     this.previewImage = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  onSubmit(){
    this.errorTitle = null;
    this.errorPrice = null;
    this.errorCity = null;
    this.errorImage = null;
    this.errorDesc = null;

    if(this.makeProd.longitude === null && this.makeProd.latitude === null){
      alert("Submit again");
    }else{
      let observable = this._httpService.postProduct(this.makeProd);
      observable.subscribe(data => {
        if(data['Message'] != "Success"){
          if(data['title']){
            this.errorTitle = data['title']['errors'];
          }

          if(data['price']){
            if(data['price']['errors'][0]['errorMessage'] === "Error converting value {null} to type 'System.Decimal'. Path 'price', line 1, position 24."){
              this.errorPrice = [{"errorMessage": "Price field is required."}];
            }else{
            this.errorPrice = data['price']['errors'];
            }
          }

          if(data['city']){
            this.errorCity = data['city']['errors'];
          }
          if(data['image']){
            this.errorImage = data['image']['errors'];
          }
          if(data['desc']){
            this.errorDesc = data['desc']['errors'];
          }
        }else{
          this.makeProd = {title: "", price: null, image: "", longitude: null, latitude: null, city: "", desc: ""};
          this.routing.navigate(['/home']);
      }
      })
    }
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

  getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          this.makeProd.longitude = position.coords.longitude;
          this.makeProd.latitude = position.coords.latitude;
        });
    } else {
       alert("No support for geolocation");
    }
  }
  //=====================================================
  getProducts(){
    this._httpService.getUserProducts().subscribe(data => {
      if(data['Message'] === "Error"){
        this.logoutClick();
      }
      this.products = data;
    })
  }

  deleteThis(id){
    if(confirm("Do you want to delete")){
      this._httpService.deleteProduct(id).subscribe(data => {
        if(data['Message'] === "Error"){
          this.logoutClick();
        }
        this.getProducts();
      })
    }
  }

  searchClick(){
    this.routing.navigate(['/searchThis/'+this.newSearch.content]);
    this.newSearch = {content: ""};
  }
}
