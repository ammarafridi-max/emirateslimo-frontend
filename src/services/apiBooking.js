import { checkError, returnData, baseURL } from './apiClient';

const URL = `${baseURL}/api/bookings`;

export async function getAvailableVehiclesApi(params) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${URL}/available-vehicles?${query}`);

  await checkError(res);
  return await returnData(res);
}

export async function getBookingApi(id) {
  const res = await fetch(`${URL}/${id}`);

  await checkError(res);
  return await returnData(res);
}

export async function createBookingApi(bookingData) {
  const res = await fetch(`${URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });

  await checkError(res);
  return await returnData(res);
}

export async function getPaymentLinkApi(id) {
  const res = await fetch(`${URL}/${id}/payment-link`, {
    method: 'POST',
  });

  await checkError(res);
  return await returnData(res);
}
