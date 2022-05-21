import BaseModel from "@/server/models/BaseModel";
import Link from "@/server/models/link";
import User from "@/server/models/user";
import RefreshToken from "@/server/models/refresh_token";

interface IUser {
  id: Number;
  username: String;
  email: String;
  password: String;
  links?: Array<ILink>;
  refresh_token?: IRefreshToken;
  created_at?: String;
  updated_at?: String;
}

interface ILink {
  id: Number;
  full: String;
  short: String;
  clicks?: Number;
  deleted?: Boolean;
  user_id: IUser["id"];
  user?: IUser;
  created_at?: String;
  updated_at?: String;
}

interface IRefreshToken {
  id: Number;
  token: String;
  expiry_date: String;
  user_id: IUser["id"];
  user?: IUser;
  createToken: (user: IUser) => IRefreshToken["token"];
  verifyExpiration: (token: IRefreshToken["token"]) => Boolean;
  created_at?: String;
  updated_at?: String;
}

export { BaseModel, Link, User, RefreshToken, IUser, ILink, IRefreshToken };
