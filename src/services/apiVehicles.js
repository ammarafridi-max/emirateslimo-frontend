import { baseURL } from '../utils/baseUrl';

const URL = `${baseURL}/api/vehicles`;

async function checkError(res) {
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Something went wrong');
  }
}

async function returnData(res) {
  const json = await res.json();
  return json?.data;
}

export async function getAllVehiclesApi() {
  const res = await fetch(URL);

  await checkError(res);
  return await returnData(res);
}

export async function getVehicleApi(id) {
  const res = await fetch(`${URL}/${id}`);

  await checkError(res);
  return await returnData(res);
}
