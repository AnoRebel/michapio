import { useBody } from "h3";
import { Mchapio } from "models";
import { errorHandler } from "server/utils";

export default defineEventHandler(async event => {
  const body = await useBody(event);
  console.log("Body: ", body);
  try {
    const exists = await Mchapio.query().findById(body.id);
    // TODO: Check if soft-deleted and ask to renew
    if (exists) {
      event.res.statusCode = 302;
      return { code: 302, message: "Mchapio already exists", data: exists };
    }
    let mchapio: Mchapio = {};
    if (body.user_id) {
      mchapio = {
        user_id: body.user_id,
        deleted: false,
      };
    } else {
      mchapio = {
        deleted: false,
      };
    }
    const added = await Mchapio.query().insert(mchapio).returning("*").first();
    event.res.statusCode = 201;
    return {
      code: event.res.statusCode,
      message: "Mchapio Created!",
      data: added,
    };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
