import { useBody } from "h3";

import { User, RefreshToken } from "@/server/models";
import { comparePass, generateToken } from "@/utils";

export default defineEventHandler(async event => {
  const user = await useBody(event);
  try {
    const exists = await User.query()
      .where(builder => builder.where("email", user.name).orWhere("username", user.name))
      .first();
    if (!exists) {
      event.res.statusCode = 404;
      return event.res.end(JSON.stringify({ message: "User Not Found" }));
    }
    const validPass = comparePass(user.password, exists.password);
    if (!validPass) {
      event.res.statusCode = 401;
      return event.res.end(JSON.stringify({ message: "Invalid Password!" }));
    }
    const token = generateToken(exists);
    const refreshToken = await RefreshToken.createToken(exists);
    event.res.statusCode = 200;
    return {
      user: {
        id: exists.id,
        username: exists.username,
        email: exists.email,
      },
      token,
      refresh: refreshToken,
    };
  } catch (err) {
    event.res.statusCode = 500;
    return event.res.end(JSON.stringify({ message: err.message }));
  }
});
