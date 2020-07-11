import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
   posts: any ;
  constructor(private postService:PostService){}

  ngOnInit() {
    this.postService.getAll()
    .subscribe(posts=>{
      console.log(posts);
      this.posts=posts;
    });
  }

  CreatePost(data){
    console.log(data.value)
    let post={title:data.value}
    this.posts.splice(0,0,post)

    data.value=''
    this.postService.create(data).subscribe(newPost=>{
      console.log(newPost)
      console.log(newPost['id'])
      post['id']=newPost['id']
      
    },(error:AppError)=>{
      this.posts.splice(0,1)
      if(error instanceof BadInput){
        alert("BAD")
      }
      else throw error
    });
  }

 
  updatePost(post){
    this.postService.update(post).subscribe(updatedPost=>{
      console.log(updatedPost)
    })
  }

  deletePost(post){
    this.postService.delete(post.id)
    .subscribe(()=>{
      let index=this.posts.indexOf(post)
      this.posts.splice(index,1)
    },(error:AppError)=>{
      if(error instanceof NotFoundError){
        alert("ALREADY")
      }
      else throw error;
    })
  }

}
