import { useBody } from "h3";
import { Link } from "@/server/models";
import { nanoid } from "nanoid";
import { errorHandler } from "@/utils";

export default defineEventHandler(async event => {
  const body = await useBody(event);
  console.log("Body: ", body);
  try {
    const exists = await Link.query().findOne("full", body.full);
    // TODO: Check if soft-deleted and ask to renew
    if (exists) {
      event.res.statusCode = 302;
      return { message: "Link already exists", data: exists };
    }
    let link: Link = {};
    if (body.user_id) {
      link = {
        full: body.full,
        short: body.code ?? nanoid(6),
        user_id: body.user_id,
        deleted: false,
      };
    } else {
      link = {
        full: body.full,
        short: body.code ?? nanoid(6),
        deleted: false,
      };
    }
    const added = await Link.query().insert(link).returning("*").first();
    event.res.statusCode = 201;
    return { code: event.res.statusCode, message: "Link Created", data: added };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
