import { Action } from "@ngrx/store";

export enum CommentActionTypes {
    AddComment = '[Comment] Add Comment',
    UpdateLikes = "[Comment] UpdateLikes"
}

export class AddComment implements Action{
    type=CommentActionTypes.AddComment
    constructor(public payload:any){}
}

export class UpdateLikes implements Action{
    type=CommentActionTypes.UpdateLikes
    constructor(public payload:number){}
}

export type CommentActions = AddComment|UpdateLikes