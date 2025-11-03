import { checkError, returnData, baseURL } from './apiClient';

const URL = `${baseURL}/api/zones`;

export async function getZoneByAddressApi({ lat, lng }) {
  const res = await fetch(`${URL}/find/by-point?lat=${lat}&lng=${lng}`);

  await checkError(res);
  return await returnData(res);
}
