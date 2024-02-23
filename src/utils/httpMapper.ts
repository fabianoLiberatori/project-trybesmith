const httpMap: Record<string, number> = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  NO_CONTENT: 204,
  UNPROCESSABLE_CONTENT: 422,
};

export default httpMap;