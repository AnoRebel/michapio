import { nanoid } from "nanoid";

import { BaseModel, IUser, IRefreshToken } from "@/server/models";

class RefreshToken extends BaseModel {
  id!: number;
  token!: string;
  expiry_date!: string;
  user_id: IUser["id"];
  user?: IUser;
  createToken: (user: IUser) => IRefreshToken["token"];
  verifyExpiration: (token: IRefreshToken["token"]) => boolean;
  created_at?: string;
  updated_at?: string;

  static get tableName() {
    return "refresh_tokens";
  }

  $beforeInsert() {
    this.created_at = new Date(Date.now()).toISOString().replace("T", " ").replace("Z", ""); // Date.now();
  }

  $beforeUpdate() {
    this.updated_at = new Date(Date.now()).toISOString().replace("T", " ").replace("Z", ""); // Date.now();
  }

  static async createToken(user: IUser): Promise<IRefreshToken["token"]> {
    const expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + 84600);
    const _token = nanoid();
    const refreshToken = await this.query()
      .insert({
        token: _token,
        user_id: user.id,
        expiry_date: expiredAt.getTime(),
      })
      .returning("*")
      .first();
    return refreshToken.token;
  }

  static verifyExpiration(token: RefreshToken): Boolean {
    return Number(token.expiry_date) < new Date().getTime();
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["token", "expiry_date"],

      properties: {
        id: { type: "integer" },
        token: { type: "string" },
        expiry_date: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: "User",
        join: {
          from: "refresh_tokens.user_id",
          to: "users.id",
        },
      },
    };
  }
}

export default RefreshToken;
