export class Message {
    id;
    text;
    user_id;
    user_name;
    datetime;
    constructor(data){
        this.id = data.id;
        this.text = data.text;
        this.user_id = data.user_id;
        this.user_name = data.user_name;
        this.datetime = data.datetime;
    }
}