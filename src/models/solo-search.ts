


export class SoloSearch {
  id:string;
  name: string;
  age: string;
  sex: string;
  profile: string;
  area:string;
    constructor(id,data){
      this.id = id;
      this.name = data.name;
      this.age = data.age;
      this.sex = data.sex;
      this.profile = data.profile;
      this.area = data.area;
    }
}