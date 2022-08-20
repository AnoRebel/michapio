import { BaseModel, IFavourite, IMchapio } from "@/server/models";

class User extends BaseModel {
  id!: number;
  username!: string;
  email?: string;
  password!: string;
  favourites: IFavourite[];
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
        favourites: { type: Array<IFavourite> },
        michapio: { type: Array<IMchapio> },
      },
    };
  }

  static get relationMappings() {
    return {
      michapio: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: "Mchapio",
        join: {
          from: "michapio.user_id",
          to: "users.id",
        },
      },
      favourites: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: "Favourite",
        join: {
          from: "users.id",
          through: {
            from: "favourites.user_id",
            to: "favourites.chapio_id",
            extra: { favourited: "status" },
          },
          to: "michapio.id",
        },
      },
    };
  }
}

export default User;
