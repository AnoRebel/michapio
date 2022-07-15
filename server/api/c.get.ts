import { Mchapio } from "models";
import { errorHandler } from "server/utils";

export default defineEventHandler(async event => {
  const { deleted } = useQuery(event);
  console.log(deleted);
  try {
    let michapio: Mchapio[];
    if (deleted) {
      michapio = await Mchapio.query().where("deleted", deleted);
    } else {
      michapio = await Mchapio.query();
    }
    if (!michapio.length) {
      event.res.statusCode = 404;
      return {
        code: event.res.statusCode,
        message: "No Michapio Available!",
      };
    }
    event.res.statusCode = 200;
    return {
      code: event.res.statusCode,
      message: "Successful",
      data: michapio,
    };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
