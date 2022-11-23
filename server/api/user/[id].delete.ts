import { User } from "@/server/models";
import { errorHandler } from "server/utils";

export default defineEventHandler(async event => {
  const { id } = getQuery(event);
  try {
    const exists = await User.query().findById(id);
    if (!exists) {
      return {
        code: 404,
        message: `No User with this id: ${id} found!`,
      };
    }
    await User.query().deleteById(id);
    return {
      code: 201,
      message: "Successfully Deleted User!",
    };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
