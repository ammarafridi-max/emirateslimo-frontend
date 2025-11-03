import { checkError, returnData, baseURL } from './apiClient';

const URL = `${baseURL}/api/vehicles`;

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
