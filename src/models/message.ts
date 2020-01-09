export class Message {
    id;
    text;
    user_id;
    user_name;
    datetime;
    constructor(data){
        this.id = data.data().id;
        this.text = data.data().text;
        this.user_id = data.data().user_id;
        this.user_name = data.data().user_name;
        this.datetime = data.data().datetime;
    }
}