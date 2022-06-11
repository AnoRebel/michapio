export default defineEventHandler(event => {
  return { message: `Unkown Id API Route: ${event.context.params}` };
});
