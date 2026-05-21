/**
 * Matches backend `sendSuccess` / `sendError` envelope shapes.
 */

export interface ApiSuccess<T = unknown> {
  success: true;
  message: string;
  data?: T;
}

export interface ApiErrorBody {
  success: false;
  message: string;
  errors?: unknown;
}
