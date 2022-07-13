export default defineEventHandler(event => {
  let r = "";
  const params = Object.entries(event.context.params);
  params.forEach(p => (r += p[1]));
  return {
    code: event.res.statusCode ?? 200,
    message: `Unknown User API Route: ${r}`,
  };
});
