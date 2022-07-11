const checkExists = async (field: string, value: string): Promise<boolean> => {
  const { data } = await useFetch("/api/check", { params: { field, value } });
  return data.value ? true : false;
};

export { checkExists };
