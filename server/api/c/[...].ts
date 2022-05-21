export default defineEventHandler(event => {
  return { message: `Unkown Code API Route: ${event.context.params}` };
});
