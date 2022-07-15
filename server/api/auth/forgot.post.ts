import { User } from "@/server/models";
import { errorHandler } from "@/server/utils";

export default defineEventHandler(async event => {
  const user = await useBody(event);
  try {
    const exists = await User.query().where("email", user.email).first();
    if (!exists) {
      event.res.statusCode = 404;
      return { code: 404, message: "Email Not Found" };
    }
    event.res.statusCode = 200;
    return {
      code: 200,
      message: "Success",
      data: {
        id: exists.id,
        username: exists.username,
        email: exists.email,
      },
    };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
