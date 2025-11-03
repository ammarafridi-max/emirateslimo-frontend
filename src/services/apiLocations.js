import { checkError, returnData, baseURL } from './apiClient';

const URL = `${baseURL}/api/locations`;

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
