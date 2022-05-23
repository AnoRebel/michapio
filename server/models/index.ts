import BaseModel from "@/server/models/BaseModel";
import Mchapio from "@/server/models/mchapio";
import User from "@/server/models/user";

interface IUser {
  id: Number;
  username: String;
  email: String;
  password: String;
  michapio?: Array<IMchapio>;
  created_at?: String;
  updated_at?: String;
}

interface IMchapio {
  id: Number;
  chapio: String;
  origin: String;
  description?: String;
  deleted?: Boolean;
  user_id: IUser["id"];
  user?: IUser;
  created_at?: String;
  updated_at?: String;
}

export { BaseModel, IMchapio, IUser, Mchapio, User };
