export default defineEventHandler(event => {
  let r = "";
  const params = Object.entries(event.context.params);
  params.forEach(p => (r += p[1]));
  return { message: `Unknown Main API Route: ${r}` };
});
