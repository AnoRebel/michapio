import { User } from "models";
import { errorHandler } from "server/utils";

export default defineEventHandler(async event => {
  const { field, value } = useQuery(event);
  try {
    switch (field) {
      case "username": {
        const name = await User.query().findOne(field, value);
        if (!name) {
          return false;
        }
        return true;
        // break;
      }
      case "email": {
        const email = await User.query().findOne(field, value);
        if (!email) {
          return false;
        }
        return true;
        // break;
      }
      default:
        return false;
      // break;
    }
  } catch (err) {
    errorHandler(err, event.res);
  }
});
