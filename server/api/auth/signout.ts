import { useBody } from "h3";
import { nanoid } from "nanoid";

import { RefreshToken, User } from "@/server/models";

export default defineEventHandler(async event => {
  const { id } = await useBody(event);
  try {
    const user = await User.query().findById(id);
    if (!user) {
      event.res.statusCode = 404;
      return event.res.end(JSON.stringify({ message: "User Not Found" }));
    }
    const token = await RefreshToken.query().findOne("user_id", id);
    if (!token) {
      event.res.statusCode = 201;
      return event.res.end(JSON.stringify({ message: "Token Not found" }));
    }
    await RefreshToken.query().deleteById(token.id);
    event.res.statusCode = 201;
    return { code: event.res.statusCode, message: "Successful" };
  } catch (err) {
    event.res.end(err);
  }
});
