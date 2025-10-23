import { baseURL } from '../utils/baseUrl';

const URL = `${baseURL}/api/booking`;

async function checkError(res) {
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Something went wrong');
  }
}

async function returnData(res) {
  const json = await res.json();
  console.log(json);
  return json?.data;
}

export async function getAvailableVehiclesApi(params) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${URL}/available-vehicles?${query}`);

  await checkError(res);
  return await returnData(res);
}
