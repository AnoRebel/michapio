import { User } from "models";
import { errorHandler } from "server/utils";

export default defineEventHandler(async event => {
  const { michapio } = getQuery(event);
  try {
    let users: User[];
    if (michapio) {
      users = await User.query().withGraphFetched("michapio");
    } else {
      users = await User.query();
    }
    if (!users.length) {
      return {
        code: 404,
        message: "No Users Available",
      };
    }
    return { code: 200, message: "Successful", data: users };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
