import { Link } from "@/server/models";
import { errorHandler } from "@/server/utils";

export default defineEventHandler(async event => {
  const code = event.context.params.code;
  console.log("Code: ", code);
  try {
    const exists = await Link.query().findOne("short", code);
    console.log("Exists: ", exists);
    if (!exists) {
      event.res.statusCode = 404;
      return event.res.end(
        JSON.stringify({
          code: event.res.statusCode,
          message: "Link doesn't exist",
        })
      );
    }
    // TODO: Check if soft-deleted and ask to renew
    if (exists.deleted) {
      event.res.statusCode = 304;
      return event.res.end(
        JSON.stringify({
          code: event.res.statusCode,
          message: "Link Already Deleted",
        })
      );
    }
    await Link.query().findById(exists.id).patch({ deleted: true });
    event.res.statusCode = 204;
    return { code: event.res.statusCode, message: "Link Deleted!" };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
