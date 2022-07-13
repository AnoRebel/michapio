import { Mchapio } from "models";
import { errorHandler } from "server/utils";

export default defineEventHandler(async event => {
  const params = useQuery(event);
  console.log(params);
  try {
    const mchapio = await Mchapio.query().findById(params.id);
    // TODO: Check if soft-deleted and ask to renew
    if (!mchapio) {
      event.res.statusCode = 404;
      return {
        code: event.res.statusCode,
        message: "Chapio doesn't exist",
      };
    }
    return { code: event.res.statusCode, message: "Successful", data: mchapio };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
