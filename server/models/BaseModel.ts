import { dirname, resolve } from "path";
import Knex from "knex";
import { Model } from "objection";

import knexConfig from "@/server/knexfile";

const __dirname = resolve(dirname("."), "server", "models");
const connection = Knex(knexConfig[process.env.NODE_ENV || "development"]);
Model.knex(connection);

class BaseModel extends Model {
  static get modelPaths() {
    return [__dirname];
  }

  // $beforeInsert() {
  //   this.created_at = new Date(Date.now()).toISOString().replace("T", " ").replace("Z", ""); // Date.now();
  // }
  //
  // $beforeUpdate() {
  //   this.updated_at = new Date(Date.now()).toISOString().replace("T", " ").replace("Z", ""); // Date.now();
  // }
}

export default BaseModel;
