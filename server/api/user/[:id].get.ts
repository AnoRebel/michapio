import { User } from "@/server/models";
import { errorHandler } from "@/server/utils";

export default defineEventHandler(async event => {
  const id = event.context.params.id;
  console.log(id);
  try {
    const user = await User.query().findById(id);
    if (!user) {
      event.res.statusCode = 404;
      return event.res.end(
        JSON.stringify({
          code: event.res.statusCode,
          message: `No User with this id: ${id} Found`,
        })
      );
    }
    console.log(user);
    event.res.statusCode = 200;
    return { code: event.res.statusCode, message: "Successful", data: user };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
