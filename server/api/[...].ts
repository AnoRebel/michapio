export default defineEventHandler(event => {
  let r = "";
  const params = Object.entries(event.context.params);
  params.forEach(p => (r += p[1]));
  return {
    code: event.node.res.statusCode ?? 200,
    message: `Unknown Main API Route: ${r}`,
  };
});
