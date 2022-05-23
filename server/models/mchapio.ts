import { BaseModel, IUser } from "@/server/models";

class Mchapio extends BaseModel {
  id!: number;
  chapio!: string;
  origin!: string;
  description?: string;
  deleted?: boolean;
  user_id: IUser["id"];
  user?: IUser;
  created_at?: string;
  updated_at?: string;

  static get tableName() {
    return "michapio";
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
      required: ["chapio", "origin"],

      properties: {
        id: { type: "integer" },
        chapio: { type: "string", minLength: 0, maxLength: 255 },
        origin: { type: "string", minLength: 0, maxLength: 255 },
        description: { type: "string", minLength: 0, maxLength: 1024 },
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

export default Mchapio;
