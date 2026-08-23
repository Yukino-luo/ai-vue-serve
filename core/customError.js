import ErrorCode from '../config/errorCodes.js'

export class CustomError extends Error {
  constructor(code, errors) {
    super(code.message);
    this.name = this.constructor.name;
    this.message = code.message;
    this.code = code.code
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

// 具体的错误类型
export class ValidationError extends CustomError {
  constructor(errors) {
    super(ErrorCode[10001], errors);
  }
}
