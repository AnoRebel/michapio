import { Mchapio } from "models";
import { errorHandler } from "server/utils";

export default defineEventHandler(async event => {
  const { deleted, recent, views } = useQuery(event);
  try {
    let michapio: Mchapio[];
    if (views) {
      michapio = await Mchapio.query()
        .where("deleted", deleted ?? false)
        .orderBy("views", "desc");
    } else {
      michapio = await Mchapio.query().where("deleted", deleted ?? false);
    }
    if (!michapio.length) {
      // event.res.statusCode = 404;
      return {
        code: 404,
        message: "No Michapio Available!",
      };
    }
    // event.res.statusCode = 200;
    return {
      code: event.res.statusCode,
      message: "Successful",
      data: michapio,
    };
  } catch (err) {
    errorHandler(err, event.res);
  }
});
