import { DataService } from './data.service';
import { BadInput } from './common/bad-input';
import { NotFoundError } from './common/not-found-error';
import { AppError } from './common/app-error';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
// import {  catchError } from 'rxjs/operators';
  
@Injectable()
export class PostService extends DataService{
  //private  url="https://jsonplaceholder.typicode.com/posts/";

  constructor(http:HttpClient) { 
    super('https://jsonplaceholder.typicode.com/posts',http)
  }

}
