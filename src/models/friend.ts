export class Friend {
    id;
    name;
    status;
    sender;
    constructor(data){
        if(data!=null){
            this.id = data.id;
            this.name = data.name;
            this.status = data.status;
            this.sender = data.sender;
        }else{
            this.id = "";
            this.name = "";
            this.status = null;
            this.sender = "";
        }
    }
}