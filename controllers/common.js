import path from "path";
import CustomController from "../core/customController.js";
import ossClient from "../core/customOss.js";
import ErrorCode from "../config/errorCodes.js";
import commonSchema from "../validators/common.validator.js";
import { CustomError, ValidationError } from "../core/customError.js";

class CommonController extends CustomController {
  constructor(service) {
    super();
    this.service = service;
  }
  async upload(ctx) {
    const file = ctx.request.files?.file;
    if (!file) {
      throw new CustomError(ErrorCode[10002])
    }

    const { error, value } = commonSchema.fileUpload.imageFile.validate({
      size: file.size, 
      mimetype: file.mimetype
    })
    if (error) {
      throw new ValidationError(error)
    }
  
    try {
      const timestamp = Date.now();
      const ext = path.extname(file.originalFilename) || "";
      const fileName = `ai-vue-demo/${timestamp}${ext}`;
      const result = await ossClient.put(fileName, file.filepath);
      ctx.body = {
        code: 200,
        data: {
          fileName: fileName,
          url: result.url,
        },
        message: "ok",
      };
    } catch (error) {
      throw new CustomError(ErrorCode[10003])
    }
  }
}

export default new CommonController();
