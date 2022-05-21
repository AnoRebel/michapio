import { Knex } from "knex";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTableIfNotExists("users", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("username", 100).unique().index().notNullable();
    table.string("email", 150).notNullable().unique();
    table.string("password").notNullable();
    table.timestamps(true, true);
  });
  await knex.schema.createTableIfNotExists("refresh_tokens", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("token").unique();
    table.string("expiry_date");
    table.integer("user_id").references("id").inTable("users");
    table.timestamps(true, true);
  });
  await knex.schema.createTableIfNotExists("links", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("full", 255).unique().notNullable();
    table.string("short", 8).unique().index().notNullable();
    table.integer("clicks").notNullable().defaultTo(0);
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
  await knex.schema.dropTableIfExists("refresh_tokens");
  await knex.schema.dropTableIfExists("links");
}
