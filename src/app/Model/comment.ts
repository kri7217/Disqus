export class MyComment {

    public replies: MyComment[] = []
    public id: number;
    public postedTime:Date;
    public likes: number;

    constructor(public name: string,
        public description: string,
        public photo: string) {
        this.id = Math.floor(Date.now() + Math.random())
        this.postedTime= new Date()
        this.likes=0
    }
}