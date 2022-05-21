export default defineEventHandler(event => {
  return { message: `Unkown User API Route: ${event.context.params}` };
});
