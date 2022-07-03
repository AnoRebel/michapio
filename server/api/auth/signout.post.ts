import { useBody } from "h3";

import { User } from "@/server/models";

export default defineEventHandler(async event => {
  const { id } = await useBody(event);
  try {
    const user = await User.query().findById(id);
    if (!user) {
      event.res.statusCode = 404;
      return event.res.end(JSON.stringify({ message: "User Not Found" }));
    }
    event.res.statusCode = 201;
    return { code: event.res.statusCode, message: "Successful" };
  } catch (err) {
    event.res.end(err);
  }
});
