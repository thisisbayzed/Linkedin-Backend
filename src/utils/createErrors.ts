import createHttpError from "http-errors";

const createError = (status: number, message: string) => {
  const error = createHttpError(status, message);
  return error;
};

export default createError;