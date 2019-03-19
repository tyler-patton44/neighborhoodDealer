import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) {}
  CreateUser(newUser){
    return this._http.post('/registration', newUser);   
  }
  LogginUser(user){
    return this._http.post('/loggingIn', user);   
  }
  LogoutUser(){
    return this._http.get('/logout');   
  }
  checkLogin(){
    return this._http.get('/checkLogin');   
  }
  postProduct(prod){
    return this._http.post('/postProduct', prod);   
  }
  getProducts(){
    return this._http.get('/showProducts');   
  }
  getUserProducts(){
    return this._http.get('/getUserProducts');   
  }
  getOneProduct(id){
    return this._http.get('/getOneProduct/'+id);   
  }
  deleteProduct(id){
    return this._http.get('/removeProduct/'+id);   
  }
  firstMessage(message, id, productId){
    return this._http.post('/newMessage/'+id+'/'+productId, message);   
  }
  getUserMessages(){
    return this._http.get('/userMessages');   
  }
  dealMessages(id){
    return this._http.get('/getMessages/'+id);
  }
  sendAMessage(message, id){
    return this._http.post('/sendMessage/'+id, message);   
  }
  searchProd(content){
    return this._http.get('/searchProduct/'+content);   
  }
}