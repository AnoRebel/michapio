import { BaseModel, IMchapio } from "@/server/models";

class User extends BaseModel {
  id!: number;
  username!: string;
  email?: string;
  password!: string;
  michapio?: IMchapio[];
  created_at?: string;
  updated_at?: string;

  static get tableName() {
    return "users";
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
      required: ["username", "password"],

      properties: {
        id: { type: "integer" },
        username: { type: "string", minLength: 2, maxLength: 100 },
        email: { type: "string", minLength: 6, maxLength: 150 },
        password: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    return {
      michapio: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: "Mchapio",
        join: {
          from: "links.user_id",
          to: "users.id",
        },
      },
    };
  }
}

export default User;
