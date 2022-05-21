export default defineEventHandler(event => {
  return { message: `Unkown Main API Route: ${event.context.params}` };
});
