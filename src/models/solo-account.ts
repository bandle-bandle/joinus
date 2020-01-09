


export class SoloAccount {
  area:string;
  birthday:string;
  email: string;
  name:string;
  profile: string;
  sex: string;
  constructor(
    area,
    birthday,
    email,
    name,
    profile,
    sex,
    password
    ){
    this.area = area;
    this.birthday = birthday;
    this.email = email;
    this.name = name;
    this.profile = profile;
    this.sex = sex;
  }
  setRefToModel(){
      // this.area = area;
      // this.birthday = birthday;
      // this.email = email;
      // this.name = name;
      // this.profile = profile;
      // this.sex = sex;
    }
  }