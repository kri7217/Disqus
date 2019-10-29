import { Injectable } from '@angular/core';
import { MyComment } from './Model/comment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  public newPostAdded:Subject<MyComment>= new Subject<MyComment>()
  comments: MyComment[];
  constructor() {
    this.comments = [
      {
        name: 'User 1',
        description: 'Comment 1 User 1',
        likes: 3,
        replies: [
          {
            name: 'User 4',
            description: 'Comment 1 User 2 User 4',
            likes: 4,
            replies: [],
            photo: "https://img.icons8.com/doodle/96/000000/user.png",
            postedTime: new Date(),
            id: 15
          }
        ],
        photo: "https://img.icons8.com/plasticine/100/000000/user.png",
        postedTime: new Date(),
        id: 14
      },
      {
        name: 'User 2',
        description: 'Comment 1 User 2',
        likes: 6,
        replies: [{
          name: 'User 21',
          description: 'Comment 1 User 2 User 4',
          likes: 4,
          replies: [],
          photo: "https://img.icons8.com/doodle/96/000000/user.png",
          postedTime: new Date(),
          id: 21
        }, {
          name: 'User 22',
          description: 'Comment 1 User 2 User 4',
          likes: 4,
          replies: [],
          photo: "https://img.icons8.com/doodle/96/000000/user.png",
          postedTime: new Date(),
          id: 22
        }, {
          name: 'User 23',
          description: 'Comment 1 User 2 User 4',
          likes: 4,
          replies: [{
            name: 'User 24',
            description: 'Comment 1 User 2 User 4',
            likes: 4,
            replies: [],
            photo: "https://img.icons8.com/doodle/96/000000/user.png",
            postedTime: new Date(),
            id: 24
          }],
          photo: "https://img.icons8.com/doodle/96/000000/user.png",
          postedTime: new Date(),
          id: 23
        }],
        photo: null,
        postedTime: new Date(),
        id: 12
      },
      {
        name: 'User 3',
        description: 'Comment 1 User 3',
        likes: 3,
        replies: [],
        photo: "https://img.icons8.com/plasticine/100/000000/user-male.png",
        postedTime: new Date(),
        id: 13
      }
    ]
  }

  getComments() {
    return [...this.comments];
  }

  addComments(comment: MyComment) {
    this.comments.push(comment)
    console.log(this.comments)
    this.newPostAdded.next(comment)
  }

  addCommentsForANode(comment: MyComment, commentId) {
    let matchingNodes = this.findTheMatchingNode(this.comments, commentId)
    matchingNodes.replies.push(comment)
    //console.log('matchingNode', matchingNodes)
    //console.log(this.comments)

  }

  searchEachComment(comment, id) {
    var ele = undefined
    if (comment.id == id) {
      return comment
    } else {
      if (comment.replies.length > 0) {
        for (var comment of comment.replies) {
          ele = this.searchEachComment(comment, id)
          if (ele) return ele;
        }
      }
    }
  }

  findTheMatchingNode(comments, id):MyComment {
    let matchingElement = undefined

    for (var comment of comments) {
      matchingElement = this.searchEachComment(comment, id)
      if (matchingElement) break;
    }
    return matchingElement
  }

}
