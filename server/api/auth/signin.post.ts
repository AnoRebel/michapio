import { User } from "@/server/models";
import { comparePass, errorHandler, generateToken } from "@/server/utils";

export default defineEventHandler(async event => {
  const user = await useBody(event);
  try {
    const exists = await User.query().findOne("username", user.name);
    if (!exists) {
      event.res.statusCode = 404;
      return { code: 404, message: "User Not Found!" };
    }
    const validPass = comparePass(user.password, exists.password);
    if (!validPass) {
      event.res.statusCode = 401;
      return { code: 401, message: "Invalid Password!" };
    }
    const token = generateToken(exists);
    event.res.statusCode = 200;
    return {
      code: 200,
      message: "Success",
      data: {
        id: exists.id,
        username: exists.username,
        email: exists.email,
      },
      token,
    };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
