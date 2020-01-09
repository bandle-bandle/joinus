
export class Room {
    id:string;
    title:string;
    last_date;
    constructor(data){
        this.id = data.data().id;
        this.title = data.data().title;
        this.last_date = data.data().last_date.toDate();
    }
}