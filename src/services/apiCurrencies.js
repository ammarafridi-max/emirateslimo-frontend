import { checkError, returnData, baseURL } from './apiClient';

const URL = `${baseURL}/api/bookings`;

export async function getCurrenciesApi() {
  const res = await fetch(`${URL}/currencies`);
  await checkError(res);
  return await returnData(res);
}
