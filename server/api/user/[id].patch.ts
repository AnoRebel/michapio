import { User } from "models";
import { errorHandler } from "server/utils";

export default defineEventHandler(async event => {
  const body = await readBody(event);
  const { id } = getQuery(event);
  console.log(`Body: ${body}, ID: ${id}`);
  try {
    const exists = await User.query().findById(id);
    if (!exists) {
      return {
        code: 404,
        message: `No User with this id: ${id} found!`,
      };
    }
    const user = await User.query().findById(id).patch(body);
    return {
      code: 201,
      message: "Successfully Updated User!",
      data: user,
    };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
