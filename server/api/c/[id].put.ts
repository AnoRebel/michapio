import { Mchapio } from "models";
import { errorHandler } from "server/utils";

export default defineEventHandler(async event => {
  const body = await useBody(event);
  const { id } = useQuery(event);
  console.log(`Id: ${id} , Body: ${body}`);
  try {
    const exists = await Mchapio.query().findById(id);
    // TODO: Check if soft-deleted and ask to renew
    if (!exists) {
      event.res.statusCode = 404;
      return {
        code: event.res.statusCode,
        message: "Mchapio doesn't exist",
      };
    }
    const patched = await Mchapio.query().findById(exists.id).patch(body);
    event.res.statusCode = 201;
    return {
      code: event.res.statusCode,
      message: "Mchapio Updated!",
      data: patched,
    };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
