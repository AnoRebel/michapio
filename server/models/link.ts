import { nanoid } from "nanoid";

import { BaseModel, IUser } from "@/server/models";

class Link extends BaseModel {
  id!: number;
  full!: string;
  short!: string;
  clicks?: number;
  deleted?: boolean;
  user_id: IUser["id"];
  user?: IUser;
  created_at?: string;
  updated_at?: string;

  static get tableName() {
    return "links";
  }

  $beforeInsert() {
    this.created_at = new Date(Date.now()).toISOString().replace("T", " ").replace("Z", ""); // Date.now();
  }

  $beforeUpdate() {
    this.updated_at = new Date(Date.now()).toISOString().replace("T", " ").replace("Z", ""); // Date.now();
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["full", "short"],

      properties: {
        id: { type: "integer" },
        full: { type: "string", minLength: 5, maxLength: 255 },
        short: { type: "string", minLength: 3, maxLength: 8, default: nanoid(6) },
        clicks: { type: "number", default: 0 },
        deleted: { type: "boolean", default: false },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.HasManyRelation,
        modelClass: "User",
        join: {
          from: "users.id",
          to: "links.user_id",
        },
      },
    };
  }
}

export default Link;
