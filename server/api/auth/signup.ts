import { useBody } from "h3";

import { User } from "@/server/models";
import { generateToken, hashPass } from "@/utils";

export default defineEventHandler(async event => {
  const user = await useBody(event);
  // TODO: username instead
  const exists = await User.query().findOne("email", user.email);
  if (exists) {
    event.res.statusCode = 302;
    return event.res.end(JSON.stringify({ message: "User Already Exists!" }));
  }
  const hashedPassword = await hashPass(user.password);
  try {
    const trans = await User.transaction(async trx => {
      const link = await User.query(trx)
        .insert({
          username: user.username,
          email: user.email,
          password: hashedPassword,
        })
        .returning("*");
      return link;
    });
    const token = generateToken(trans);
    event.res.statusCode = 201;
    return {
      user: {
        id: trans.id,
        username: trans.username,
        email: trans.email,
      },
      token,
    };
  } catch (err) {
    event.res.statusCode = 500;
    event.res.end(JSON.stringify({ message: err.message }));
  }
});
