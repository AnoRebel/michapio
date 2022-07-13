import { User } from "models";
import { errorHandler } from "server/utils";

export default defineEventHandler(async event => {
  const body = await useBody(event);
  const { id } = useQuery(event);
  console.log(`Body: ${body}, ID: ${id}`);
  try {
    const exists = await User.query().findById(id);
    if (!exists) {
      event.res.statusCode = 404;
      return {
        code: event.res.statusCode,
        message: `No User with this id: ${id} found!`,
      };
    }
    const user = await User.query().findById(id).patch(body);
    event.res.statusCode = 201;
    return {
      code: event.res.statusCode,
      message: "Successfully Updated User!",
      data: user,
    };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
