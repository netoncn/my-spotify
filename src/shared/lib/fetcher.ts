import { refreshAccessToken } from '@/shared/api/spotify';

interface CustomResponse<T> extends Response {
  json(): Promise<T>;
}

export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  let response: CustomResponse<T> = await fetch(url, options);

  if (response.status === 401) {
    try {
      await refreshAccessToken();
      response = await fetch(url, options);
    } catch (refreshError) {
      console.error('Failed to refresh token:', refreshError);
      throw refreshError; 
    }
  }

  if (!response.ok) {
    const parsed = await response.json() as unknown;
    let message: string | undefined;
    if (parsed && typeof parsed === 'object' && 'message' in parsed && typeof (parsed as any).message === 'string') {
      message = (parsed as any).message;
    }
    throw new Error(message || 'Something went wrong');
  }

  return response.json();
}
