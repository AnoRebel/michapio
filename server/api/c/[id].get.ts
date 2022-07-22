import { Mchapio } from "models";
import { errorHandler } from "server/utils";

export default defineEventHandler(async event => {
  const { id } = useQuery(event);
  try {
    const mchapio = await Mchapio.query().findById(id);
    // TODO: Check if soft-deleted and ask to renew
    if (!mchapio) {
      return {
        code: 404,
        message: "Chapio doesn't exist",
      };
    }
    return { code: event.res.statusCode, message: "Successful", data: mchapio };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
