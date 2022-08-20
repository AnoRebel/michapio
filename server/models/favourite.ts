import { BaseModel, IMchapio, IUser } from "@/server/models";

class Favourite extends BaseModel {
  id!: number;
  status: boolean;
  user_id: IUser["id"];
  chapio_id: IMchapio["id"];
  created_at?: string;
  updated_at?: string;

  static get tableName() {
    return "favourites";
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
      required: ["user_id", "chapio_id"],

      properties: {
        id: { type: "integer" },
        status: { type: "boolean", default: false },
        user_id: { type: "integer" },
        chapio_id: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    return {};
  }
}

export default Favourite;
