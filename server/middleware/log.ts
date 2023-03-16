export default defineEventHandler(event => {
  console.info(
    `[${new Date().toLocaleTimeString()}] - Request: ${event.node.req.url}, Method: ${
      event.node.req.method
    }`
  );
});
