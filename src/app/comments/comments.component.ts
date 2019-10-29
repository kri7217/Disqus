import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommentsService } from '../comments.service';
import { MyComment } from '../Model/comment';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState, selectComments } from '../State/reducer';
import { AddComment } from '../State/actions';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  subScription = new Subscription()
  myComments: Observable<MyComment[]>;
  newPostMessage: string
  userNotLoggedIn: boolean;
  userName:string
  
  constructor(private store: Store<IAppState>){
   this.myComments= this.store.pipe(select(selectComments))
  }

  ngOnInit() {
    // this.subScription = this.commentsService.newPostAdded.subscribe(comment => {
    //   this.myComments = [...this.myComments]
    //   this.myComments.push(comment)
    // })
    
  }

  onUserNameEntered(f:NgForm){
    sessionStorage.setItem('user',f.form.controls['name'].value)
    this.userNotLoggedIn=false;
    this.addNewPost()
  }

  addNewPost() {
    if(sessionStorage.getItem('user')){
      let comment = new MyComment(sessionStorage.getItem('user'), this.newPostMessage, null)
      this.store.dispatch(new AddComment({comment:comment}))
      this.newPostMessage = undefined
    }else{
      this.userNotLoggedIn=true;
    }
    //this.commentsService.addComments(comment)
  }
}
