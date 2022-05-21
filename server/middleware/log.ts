// import { useQuery, defineMiddleware } from "h3";

// import { validateToken } from "~/utils";

// export default defineMiddleware((req, res, next) => {
//   if ("api" in useQuery(req)) {
//     throw new Error("Server middleware error");
//   }
//   next();
// });
export default defineEventHandler(event => {
  console.info(
    `[${new Date().toLocaleTimeString()}] - Request: ${event.req.url}, Method: ${event.req.method}`
  );
});
