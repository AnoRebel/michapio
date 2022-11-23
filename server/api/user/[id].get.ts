import { User } from "models";
import { errorHandler } from "server/utils";

export default defineEventHandler(async event => {
  const { id } = getQuery(event);
  try {
    const user = await User.query().findById(id);
    if (!user) {
      return {
        code: 404,
        message: `No User with this id: ${id} Found!`,
      };
    }
    console.log(user);
    return { code: 200, message: "Success", data: user };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
