import type { AxiosResponse } from 'axios';

/** Backend JSON envelope: `{ success, message?, data? }` */
export type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  data?: T;
};

/** Use when `data` is required for the happy path */
export function getEnvelopeData<T>(res: AxiosResponse<ApiEnvelope<T>>, fallbackMsg = 'Unexpected response'): T {
  const d = res.data?.data;
  if (d === undefined) throw new Error(res.data?.message ?? fallbackMsg);
  return d;
}
