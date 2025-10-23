import { baseURL } from '../utils/baseUrl';

const URL = `${baseURL}/api/locations`;

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

export async function getLocationsApi(query) {
  const res = await fetch(`${URL}?query=${query}`);
  if (!res.ok) throw new Error('Could not fetch locations');
  const data = await res.json();
  return data?.data;
}

export async function getDistanceApi({
  originLat,
  originLng,
  destLat,
  destLng,
}) {
  const res = await fetch(
    `${URL}/distance?originLat=${originLat}&originLng=${originLng}&destLat=${destLat}&destLng=${destLng}`
  );

  await checkError(res);
  return await returnData(res);
}
