import Pagination, { PAGE_SIZES } from "./PaginationModel";

/**
 * 基于数据库limit & offset偏移量实现分页
 */
export default class PaginationOffset extends Pagination {

  /**
   * @params offset 数据起始偏移量
   * @params limit 默认每页大小
   */
  constructor(offset = 0, limit = PAGE_SIZES[0]) {
    super();

    this.offset = offset;
    this.limit = limit;

    this.init();
  }

  init() {
    // 通过limit计算pageSize
    Object.defineProperty(this, "pageSize", {
      set(size) {
        this.limit = size;
        this.offset = 0;
      },
      get() {
        return this.limit;
      }
    });

    // 通过offset计算pageIndex
    Object.defineProperty(this, "pageIndex", {
      set(index) {
        this.offset = this.limit * (index - 1);
      },
      get() {
        return Math.floor(this.offset / this.limit) + 1;
      }
    });
  }
}
