import { BaseModel, ILike, IUser } from "@/server/models";

class Mchapio extends BaseModel {
  id!: number;
  chapio!: string;
  origin!: string;
  views: number;
  likes: ILike[];
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
        views: { type: "integer", default: 0 },
        likes: { type: Array<ILike> },
        description: { type: "string", minLength: 0, maxLength: 1024 },
        deleted: { type: "boolean", default: false },
        user_id: { type: "integer" },
        user: { type: "IUser" },
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
          to: "michapio.user_id",
        },
      },
      likes: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: "Likes",
        join: {
          from: "michapio.id",
          through: {
            from: "likes.chapio_id",
            to: "likes.user_id",
            extra: { liked: "status" },
          },
          to: "users.id",
        },
      },
    };
  }
}

export default Mchapio;
