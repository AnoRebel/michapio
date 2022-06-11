import { User } from "@/server/models";
import { errorHandler } from "server/utils";

export default defineEventHandler(async event => {
  const id = event.context.params.id;
  console.log(id);
  try {
    const exists = await User.query().findById(id);
    if (!exists) {
      event.res.statusCode = 404;
      return event.res.end(
        JSON.stringify({
          code: event.res.statusCode,
          message: `No User with this id: ${id} found!`,
        })
      );
    }
    await User.query().deleteById(id);
    event.res.statusCode = 201;
    return {
      code: event.res.statusCode,
      message: "Successfully Deleted User!",
    };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
