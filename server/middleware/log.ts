export default defineEventHandler(event => {
  console.info(
    `[${new Date().toLocaleTimeString()}] - Request: ${event.req.url}, Method: ${event.req.method}`
  );
});
