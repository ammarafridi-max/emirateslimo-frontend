export const baseURL = import.meta.env.VITE_BACKEND_URL;

export async function checkError(res) {
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Something went wrong');
  }
}

export async function returnData(res) {
  const json = await res.json();
  return json?.data;
}
