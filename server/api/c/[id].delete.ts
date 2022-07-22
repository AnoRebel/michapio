import { Mchapio } from "models";
import { errorHandler } from "server/utils";

export default defineEventHandler(async event => {
  const { id } = useQuery(event);
  try {
    const exists = await Mchapio.query().findById(id);
    if (!exists) {
      return {
        code: 404,
        message: "Mchapio Doesn't Exist!",
      };
    }
    // TODO: Check if soft-deleted and ask to renew
    if (exists.deleted) {
      return {
        code: 304,
        message: "Mchapio Already Deleted!",
      };
    }
    await Mchapio.query().findById(exists.id).patch({ deleted: true });
    return { code: 204, message: "Mchapio Deleted!" };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
