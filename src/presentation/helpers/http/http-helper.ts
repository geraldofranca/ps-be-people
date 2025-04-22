export type HttpResponse<T = any> = {
  statusCode: number;
  body: T;
};

export const ok = <T>(body: T): HttpResponse<T> => ({
  statusCode: 200,
  body,
});

export const created = <T>(body: T): HttpResponse<T> => ({
  statusCode: 201,
  body,
});

export const badRequest = (
  message: string,
): HttpResponse<{ message: string }> => ({
  statusCode: 400,
  body: { message },
});

export const notFound = (
  message: string,
): HttpResponse<{ message: string }> => ({
  statusCode: 404,
  body: { message },
});

export const conflict = (
  message: string,
): HttpResponse<{ message: string }> => ({
  statusCode: 409,
  body: { message },
});

export const serverError = (
  message = 'Internal server error',
): HttpResponse<{ message: string }> => ({
  statusCode: 500,
  body: { message },
});
