import jwt from 'jsonwebtoken'
import UserModel from '../model/user.js'
import { CustomError } from '../core/customError.js'
import ErrorCode from '../config/errorCodes.js'

const authMiddleware = async (ctx, next) => {
  let token = ctx.header?.authorization;
  let decoded = ''

  if (!token) {
    throw new CustomError(ErrorCode[11001]);
  }

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new CustomError(ErrorCode[11002]);
  }
  if (!decoded) {
    throw new CustomError(ErrorCode[11002]);
  }

  const user = await UserModel.findByPk(decoded.userId, {
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    throw new CustomError(ErrorCode[11003]);
  }

  ctx.state.user = user;
  await next();
};

export default authMiddleware;
