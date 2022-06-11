import { useQuery } from "h3";

import { Mchapio } from "models";
import { errorHandler } from "server/utils";

export default defineEventHandler(async event => {
  const id = event.context.params.id;
  const params = useQuery(event);
  console.log(id, params);
  try {
    const mchapio = await Mchapio.query().findById(id);
    // TODO: Check if soft-deleted and ask to renew
    if (!mchapio) {
      event.res.statusCode = 404;
      return event.res.end(
        JSON.stringify({
          code: event.res.statusCode,
          message: "Chapio doesn't exist",
        })
      );
    }
    return { code: event.res.statusCode, message: "Successful", data: mchapio };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
