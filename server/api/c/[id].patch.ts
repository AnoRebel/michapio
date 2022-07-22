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
      return {
        code: 404,
        message: "Mchapio Doesn't Exist!",
      };
    }
    const patched = await Mchapio.query().findById(exists.id).patch(body);
    return {
      code: 201,
      message: "Mchapio Updated!",
      data: patched,
    };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
