export default defineEventHandler(event => {
  let r = "";
  const params = Object.entries(event.context.params);
  params.forEach(p => (r += p[1]));
  return { message: `Unkown Main API Route: ${r}` };
});
