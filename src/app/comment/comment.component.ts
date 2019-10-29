import { Component, OnInit, Input } from '@angular/core';
import { MyComment } from '../Model/comment';
import { CommentsService } from '../comments.service';
import { IAppState } from '../State/reducer';
import { Store } from '@ngrx/store';
import { AddComment, UpdateLikes } from '../State/actions';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input('commentItem') commentItem: MyComment
  defaultImage = "assets/images/user4.png"
  replyEnabled: boolean
  addedReply: string = undefined
  commentPostedDate: string
  userNotLoggedIn: boolean;

  //Ctor when Store was not used
  // constructor(public service:CommentsService) {
  //   this.replyEnabled = false;
  //   //this.findDate()
  // }

  constructor(public store: Store<IAppState>) {
  }

  ngOnInit() {
    this.findDate()
  }

  enableReplySection() {
    this.replyEnabled = true;
  }
  onUserNameEntered(f: NgForm) {
    sessionStorage.setItem('user', f.form.controls['name'].value)
    this.userNotLoggedIn = false;
    this.addReplyToComments()
  }

  addReplyToComments() {
    if (sessionStorage.getItem('user')) {
      let comment = new MyComment(sessionStorage.getItem('user'), this.addedReply, null)

      this.store.dispatch(new AddComment({ comment: comment, id: this.commentItem.id }))
      //this.service.addCommentsForANode(comment,this.commentItem.id)
      this.replyEnabled = false;
      this.addedReply = undefined;
    }
    else {
      this.userNotLoggedIn = true;
    }
  }

  updateLikes(){
    this.store.dispatch(new UpdateLikes(this.commentItem.id))
  }

  findDate() {

    let date = this.commentItem.postedTime
    let currDate = new Date()

    //different year
    if (date.getFullYear() < currDate.getFullYear()) {
      this.commentPostedDate = `${date.toLocaleString("en-us", { month: "short" })} ${date.getFullYear()}`
    }

    //minutes/hours/sec ago

    else if (date.getMonth() == currDate.getMonth() &&

      date.getDate() == currDate.getDate()) {

      if (date.getHours() == currDate.getHours()) {

        if (date.getMinutes() != currDate.getMinutes()) {

          this.commentPostedDate = `${Math.abs(currDate.getMinutes() - date.getMinutes())} minute(s) ago`

        }
        else if (date.getMinutes() == currDate.getMinutes()) {
          let diff = Math.abs(currDate.getSeconds() - date.getSeconds())
          this.commentPostedDate = diff > 0 ?`${diff} sec(s) ago` : 'Just now'
        }

        else {
          this.commentPostedDate = `Just now`
        }
      }
      else {
        this.commentPostedDate = `${Math.abs(currDate.getHours() - date.getHours())} hour(s) ago`
      }

    }

    // day or week ago
    else if (date.getMonth() != currDate.getMonth()) {
      this.commentPostedDate = `${Math.abs(currDate.getMonth() - date.getMonth())} month(s) ago`
    }

    else if (date.getDate() != currDate.getDate()) {

      let daysDiff = Math.abs(date.getDate() - currDate.getDate())

      this.commentPostedDate = (daysDiff / 7) >= 1 ? `${daysDiff} week(s) ago` : `${daysDiff} day(s) ago`
    }
  }
}
