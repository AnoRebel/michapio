import { serverSupabaseClient } from "#supabase/server";
import { errorHandler } from "server/utils";

export default defineEventHandler(async event => {
  const client = serverSupabaseClient(event);
  const { field, value } = getQuery(event);
  try {
    switch (field) {
      case "username": {
        const { data } = await client.from("users").select("username").eq(field, value).single();
        if (!data.username) {
          return false;
        }
        return true;
        // break;
      }
      case "email": {
        const { data } = await client.from("users").select("email").eq(field, value).single();
        if (!data.email) {
          return false;
        }
        return true;
        // break;
      }
      default:
        return false;
      // break;
    }
  } catch (err) {
    errorHandler(err, event.node.res);
  }
});
