export const PAGE_SIZES = [20, 40, 60, 80, 100];
Object.freeze(PAGE_SIZES);

export default class Pagination {
  static pageSizes = PAGE_SIZES;
  static total = 0;

  /**
   * @params pageIndex 页码
   * @params lipageSizemit 每页大小
   */
  constructor(pageIndex = 1, pageSize = PAGE_SIZES[0]) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
  }
}
