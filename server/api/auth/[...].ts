export default defineEventHandler(event => {
  return { message: `Unkown Auth API Route: ${event.context.params}` };
});
