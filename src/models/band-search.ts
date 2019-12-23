


export class BandSearch {
  id:string;
  name: string;
  profile: string;
  area:string;
    constructor(id,data){
      this.id = id;
      this.name = data.name;
      this.profile = data.profile;
      this.area = data.area;
    }
}