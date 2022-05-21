import { useBody } from "h3";

import { User } from "@/server/models";
import { errorHandler } from "@/utils";

export default defineEventHandler(async event => {
  const body = await useBody(event);
  console.log("User: ", body);
  try {
    const exists = await User.query().findOne("email", body.email);
    if (exists) {
      event.res.statusCode = 304;
      return event.res.end(
        JSON.stringify({
          code: event.res.statusCode,
          message: `User with email: ${body.email} already exists`,
        })
      );
    }
    const user = await User.query().insert(body).returning("*").first();
    event.res.statusCode = 201;
    return { code: event.res.statusCode, message: "Successful", data: user };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
