import { Knex } from "knex";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTableIfNotExists("users", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("username", 100).unique().index().notNullable();
    table.string("email", 150).nullable().unique();
    table.string("password").notNullable();
    table.timestamps(true, true);
  });
  await knex.schema.createTableIfNotExists("michapio", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("chapio", 255).notNullable();
    table.string("origin", 255).notNullable();
    table.integer("views").defaultTo(0).notNullable();
    table.string("description", 1024).nullable();
    table.boolean("deleted").defaultTo(false);
    table.integer("user_id").references("id").inTable("users").onDelete("SET NULL").nullable();
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists("users");
  await knex.schema.dropTableIfExists("michapio");
}
