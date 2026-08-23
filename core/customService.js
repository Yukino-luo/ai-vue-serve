class CustomService {
  async offsetPaginate(options = {}) {
    const { pageNum = 1, pageSize = 10, ...queryOptions } = options;
    const offset = (pageNum - 1) * pageSize;
    const result = await this.model.findAndCountAll({
      limit: pageSize,
      offset,
      ...queryOptions
    });

    return {
      list: result.rows,
      current: parseInt(pageNum),
      size: parseInt(pageSize),
      pages: Math.ceil(result.count / pageSize),
      total: result.count,
    };
  }
}

export default CustomService;
