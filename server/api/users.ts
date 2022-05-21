import { useQuery } from "h3";

import { User } from "@/server/models";
import { errorHandler } from "@/utils";

export default defineEventHandler(async event => {
  const { links } = useQuery(event);
  console.log(links);
  try {
    let users;
    if (links) {
      users = await User.query().withGraphFetched("links");
    } else {
      users = await User.query();
    }
    if (!users.length) {
      event.res.statusCode = 404;
      return event.res.end(
        JSON.stringify({ code: event.res.statusCode, message: "No Users Available" })
      );
    }
    event.res.statusCode = 200;
    return { code: event.res.statusCode, message: "Successful", data: users };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
