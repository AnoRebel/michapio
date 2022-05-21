import { useQuery } from "h3";

import { Link } from "@/server/models";
import { errorHandler } from "@/utils";

export default defineEventHandler(async event => {
  const { deleted } = useQuery(event);
  console.log(deleted);
  try {
    let links;
    if (deleted) {
      links = await Link.query().where("deleted", deleted);
    } else {
      links = await Link.query();
    }
    if (!links.length) {
      event.res.statusCode = 404;
      return event.res.end(
        JSON.stringify({ code: event.res.statusCode, message: "No Links Available!" })
      );
    }
    event.res.statusCode = 200;
    return { code: event.res.statusCode, message: "Successful", data: links };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
