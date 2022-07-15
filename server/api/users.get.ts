import { User } from "models";
import { errorHandler } from "server/utils";

export default defineEventHandler(async event => {
  const { michapio } = useQuery(event);
  console.log(michapio);
  try {
    let users: User[];
    if (michapio) {
      users = await User.query().withGraphFetched("michapio");
    } else {
      users = await User.query();
    }
    if (!users.length) {
      event.res.statusCode = 404;
      return {
        code: event.res.statusCode,
        message: "No Users Available",
      };
    }
    event.res.statusCode = 200;
    return { code: event.res.statusCode, message: "Successful", data: users };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
