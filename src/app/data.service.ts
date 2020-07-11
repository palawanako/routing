import { BadInput } from './common/bad-input';
import { NotFoundError } from './common/not-found-error';
import { AppError } from './common/app-error';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
// import {  catchError } from 'rxjs/operators';
  
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private url:string,private http:HttpClient) { }

  getAll(){
    return this.http.get(this.url)
    .map(response=>response)
    .catch(this.hamdleError)
  }

  create(resource){
    return this.http.post(this.url,JSON.stringify(resource))
    .map(response=>response)
    .catch(this.hamdleError)
  }

  update(resource){
    return this.http.patch(this.url+'/'+resource.id,JSON.stringify({isRead:true}))
    .map(response=>response)
    .catch(this.hamdleError)
  }

  delete(id){
    return this.http.delete(this.url+'/'+id)
    .map(response=>response)
    .catch(this.hamdleError)
  }

  private hamdleError(error:Response){
    if(error.status===400)
    return Observable.throw(new BadInput(error.json()))

    if(error.status===404)
      return Observable.throw(new NotFoundError())

      return Observable.throw(new AppError(error))
  }
}
