import { useBody } from "h3";

import { User } from "@/server/models";
import { errorHandler, generateToken, hashPass } from "@/server/utils";

export default defineEventHandler(async event => {
  const user = await useBody(event);
  const exists = await User.query().findOne("username", user.name);
  if (exists) {
    event.res.statusCode = 302;
    return { code: 302, message: "User Already Exists!" };
  }
  const hashedPassword = await hashPass(user.password);
  try {
    const trans = await User.transaction(async trx => {
      const link = await User.query(trx)
        .insert({
          username: user.name,
          email: user.email,
          password: hashedPassword,
        })
        .returning("*");
      return link;
    });
    const token = generateToken(trans);
    event.res.statusCode = 201;
    return {
      code: 201,
      message: "Success",
      data: {
        id: trans.id,
        username: trans.username,
        email: trans.email,
        token,
      },
    };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
