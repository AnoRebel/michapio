import { User } from "@/server/models";
import { errorHandler } from "@/server/utils";

export default defineEventHandler(async event => {
  const { id } = await useBody(event);
  try {
    const user = await User.query().findById(id);
    if (!user) {
      event.res.statusCode = 404;
      return { code: 404, message: "User Not Found!" };
    }
    event.res.statusCode = 201;
    return { code: 201, message: "Successful" };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
