import { CustomError, ValidationError } from '../core/customError.js'
import ErrorCode from '../config/errorCodes.js'

const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (error) {

    const errorResponse = {
      code: error?.code ?? ErrorCode[10000].code,
      message: error?.message ?? ErrorCode[10000].message,
      error: {},
    };

    if (error instanceof ValidationError) {
      errorResponse.error = {
        path: ctx.path,
        method: ctx.method,
        timestamp: new Date().toISOString(),
        errors: error.errors
      };
    } else if (error instanceof CustomError) {
      errorResponse.error = {
        path: ctx.path,
        method: ctx.method,
        timestamp: new Date().toISOString(),
      };
    } else {
      errorResponse.error = {
        path: ctx.path,
        method: ctx.method,
        timestamp: new Date().toISOString(),
        errors: error?.errors
      };
    }
    ctx.status = 200;
    ctx.body = errorResponse;
    ctx.app.emit("error", error, ctx);
  }
}

export default errorHandler;
