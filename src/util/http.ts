export async function get(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('there was an error');
  }
  const data = response.json() as unknown;
  return data;
}
