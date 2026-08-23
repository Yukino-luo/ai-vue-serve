import Joi from "joi";

// 文件名长度验证器[reference:12]
const fileNameLength = (minLength, maxLength) => {
  return (value, helpers) => {
    const nameLength = value.name.trim().length;
    if (nameLength < minLength) {
      return helpers.error("filename.min");
    }
    if (nameLength > maxLength) {
      return helpers.error("filename.max");
    }
    return value;
  };
};

// 文件类型验证器[reference:13]
const fileMimeType = (allowedTypes) => {
  return (value, helpers) => {
    if (!allowedTypes.includes(value.type)) {
      return helpers.error("filetype.invalid");
    }
    return value;
  };
};

// 文件大小验证器[reference:14]
const fileMaxSize = (maxSize) => {
  return (value, helpers) => {
    if (value.size > maxSize) {
      return helpers.error("filesize.exceeded");
    }
    return value;
  };
};

const commonSchema = {
  fileUpload: {
    imageFile: Joi.object({
      mimetype: Joi.string().valid("image/jpeg", "image/jpg", "image/png", "image/gif").required(),
      size: Joi.number().max(1 * 1024 * 1024),
    }),
  },
};

export default commonSchema;
