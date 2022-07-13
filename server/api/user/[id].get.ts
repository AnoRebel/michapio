import { User } from "models";
import { errorHandler } from "server/utils";

export default defineEventHandler(async event => {
  const { id } = useQuery(event);
  console.log(id);
  try {
    const user = await User.query().findById(id);
    if (!user) {
      event.res.statusCode = 404;
      return {
        code: event.res.statusCode,
        message: `No User with this id: ${id} Found!`,
      };
    }
    console.log(user);
    event.res.statusCode = 200;
    return { code: event.res.statusCode, message: "Success", data: user };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
