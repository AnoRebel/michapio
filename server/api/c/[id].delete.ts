import { Mchapio } from "models";
import { errorHandler } from "server/utils";

export default defineEventHandler(async event => {
  const { id } = useQuery(event);
  console.log("Id: ", id);
  try {
    const exists = await Mchapio.query().findById(id);
    console.log("Exists: ", exists);
    if (!exists) {
      event.res.statusCode = 404;
      return {
        code: event.res.statusCode,
        message: "Mchapio Doesn't Exist!",
      };
    }
    // TODO: Check if soft-deleted and ask to renew
    if (exists.deleted) {
      event.res.statusCode = 304;
      return {
        code: event.res.statusCode,
        message: "Mchapio Already Deleted!",
      };
    }
    await Mchapio.query().findById(exists.id).patch({ deleted: true });
    event.res.statusCode = 204;
    return { code: event.res.statusCode, message: "Mchapio Deleted!" };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
