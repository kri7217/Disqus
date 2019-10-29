import { Action } from "@ngrx/store";

export  enum CommentActionTypes {
    AddComment = '[Comment] Add Comment',
}

export class AddComment implements Action{
    type=CommentActionTypes.AddComment
    constructor(public payload:any){}
}

export type CommentActions = AddComment