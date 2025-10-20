import { baseURL } from '../utils/baseUrl';

const URL = `${baseURL}/api/zones`;

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

export async function getZoneByAddressApi({ lat, lng }) {
  const res = await fetch(`${URL}/find/by-point?lat=${lat}&lng=${lng}`);

  await checkError(res);
  return await returnData(res);
}
