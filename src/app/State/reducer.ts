import { MyComment } from '../Model/comment';
import { CommentActions, CommentActionTypes } from './actions'

export const selectComments = (state: any) => {
    return state.comments.CommentsList
};

export interface IAppState {
    CommentsList: MyComment[]
}
const initialState: IAppState = {
    CommentsList: [
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
                    postedTime: new Date(2018,9,12,13,55),
                    id: 15
                }
            ],
            photo: "https://img.icons8.com/plasticine/100/000000/user.png",
            postedTime: new Date(2018,9,12,14,0),
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
                postedTime: new Date(2019,0,21,4,56),
                id: 21
            }, {
                name: 'User 22',
                description: 'Comment 1 User 2 User 4',
                likes: 4,
                replies: [],
                photo: "https://img.icons8.com/doodle/96/000000/user.png",
                postedTime: new Date(2019,1,22,4,56),
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
                    postedTime: new Date(2019,9,21,4,56),
                    id: 24
                }],
                photo: "https://img.icons8.com/doodle/96/000000/user.png",
                postedTime: new Date(2019,2,22,4,56),
                id: 23
            }],
            photo: null,
            postedTime: new Date(2018,11,21),
            id: 12
        },
        {
            name: 'User 3',
            description: 'Comment 1 User 3',
            likes: 3,
            replies: [],
            photo: "https://img.icons8.com/plasticine/100/000000/user-male.png",
            postedTime: new Date(2019,9,27,0,56),
            id: 13
        }
    ]
}

function searchEachComment(comment, id) {
    var ele = undefined
    if (comment.id == id) {
        return comment
    } else {
        if (comment.replies.length > 0) {
            for (var comment of comment.replies) {
                ele = searchEachComment(comment, id)
                if (ele) return ele;
            }
        }
    }
}

function findTheMatchingNode(comments, id): MyComment {
    let matchingElement = undefined

    for (var comment of comments) {
        matchingElement = searchEachComment(comment, id)
        if (matchingElement) break;
    }
    return matchingElement
}

export function commentReducer(state: IAppState = initialState, action: CommentActions) {
    switch (action.type) {
        case CommentActionTypes.AddComment:
            let comments = [...state.CommentsList]
            if (action.payload.id) {
                let elementMatched = findTheMatchingNode(comments, action.payload.id)
                elementMatched.replies = [...elementMatched.replies, action.payload.comment]
            } else {
                comments.push(action.payload.comment)
            }
            return { ...state,
                 CommentsList: comments 
                };
        default:
            return state;

    }
}