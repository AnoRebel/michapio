import { useBody } from "h3";

import { RefreshToken } from "@/server/models";
import { generateToken } from "@/utils";

export default defineEventHandler(async event => {
  const body = await useBody(event);
  if (body.refresh) {
    event.res.statusCode = 403;
    return { message: "Refresh Token is Required" };
  }
  try {
    const exists = await RefreshToken.query()
      .findOne("token", body.refresh)
      .withGraphFetched("user");
    if (!exists) {
      event.res.statusCode = 403;
      return { message: "Refresh Token Not Database" };
    }
    if (RefreshToken.verifyExpiration(body.refresh)) {
      try {
        const trans = await RefreshToken.transaction(async trx => {
          return await RefreshToken.query(trx).deleteById(exists.id).returning("*");
        });
        // console.log(trans);
        event.res.statusCode = 403;
        return {
          message: "Refresh Token Has Expired. Sign In to get New Token.",
        };
      } catch (err) {
        // console.error(err);
        event.res.statusCode = 400;
        return { message: err };
      }
    }
    const token = generateToken(exists.user);
    event.res.statusCode = 200;
    return {
      token,
      refresh: exists.token,
    };
  } catch (err) {
    event.res.statusCode = 500;
    return { message: err.message };
  }
});
