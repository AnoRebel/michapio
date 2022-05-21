import { useBody } from "h3";
import { Link } from "@/server/models";
import { errorHandler } from "@/utils";

export default defineEventHandler(async event => {
  const body = await useBody(event);
  const code = event.context.params.code;
  console.log(`Code: ${code} , Body: ${body}`);
  try {
    const exists = await Link.query().findOne("short", code);
    console.log("Exists: ", exists);
    // TODO: Check if soft-deleted and ask to renew
    if (!exists) {
      event.res.statusCode = 404;
      return event.res.end(
        JSON.stringify({ code: event.res.statusCode, message: "Link doesn't exist" })
      );
    }
    const patched = await Link.query().findById(exists.id).patch(body).returning("*").first();
    event.res.statusCode = 201;
    return { code: event.res.statusCode, message: "Link Updated!", data: patched };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
