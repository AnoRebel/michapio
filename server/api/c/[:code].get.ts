import { useQuery } from "h3";

import { Link } from "@/server/models";
import { errorHandler } from "@/utils";

export default defineEventHandler(async event => {
  const code = event.context.params.code;
  const params = await useQuery(event);
  console.log(code, params);
  try {
    const link = await Link.query().findOne("short", code);
    // TODO: Check if soft-deleted and ask to renew
    if (!link) {
      event.res.statusCode = 404;
      return event.res.end(
        JSON.stringify({ code: event.res.statusCode, message: "Link doesn't exist" })
      );
    }
    return { code: event.res.statusCode, message: "Successful", data: link };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
