<script>
import { Pagination } from "element-ui";
import { overwrite } from "lqq-util/lib/object";
import PaginationModel from "./PaginationModel";

export default {
  name: "Pagination",

  components: {
    [Pagination.name]: Pagination
  },

  props: {
    defaultData: {
      type: PaginationModel,
      default: () => new PaginationModel()
    },

    pageSizes: {
      type: Array,
      default: () => PaginationModel.pageSizes
    },

    total: {
      type: Number,
      default: 0
    },

    fields: {
      type: Array,
      default: null
    }
  },

  data() {
    this.defaultDataCache = null;

    return {
      paginationModel: null
    };
  },

  created() {
    this.cacheDefaultData();
    this.initModel();
  },

  methods: {
    initModel() {
      this.paginationModel = overwrite(
        new PaginationModel(),
        this.defaultDataCache
      );
    },

    cacheDefaultData() {
      this.defaultDataCache = { ...this.defaultData };
    },

    reset() {
      this.initModel();
    },

    resetIndex(index = 1) {
      this.onCurrentChange(index);
    },

    getData() {
      // 按自定义字段名称返回
      if (this.fields) {
        const [pageIndexName, pageSizeName] = this.fields;

        return {
          [pageIndexName]: this.paginationModel.pageIndex,
          [pageSizeName]: this.paginationModel.pageSize
        };
      }

      return this.paginationModel;
    },

    onSizeChange(size) {
      this.paginationModel.pageIndex = 1;
      this.paginationModel.pageSize = size;
      this.$emit("change", this.paginationModel);
    },

    onCurrentChange(current) {
      this.paginationModel.pageIndex = current;
      this.$emit("change", this.paginationModel);
    }
  },

  render(h) {
    const { total, pageSizes, paginationModel } = this;
    const { pageSize, pageIndex } = paginationModel;

    return (
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        total={total}
        pageSizes={pageSizes}
        pageSize={pageSize}
        currentPage={pageIndex}
        {...{
          on: {
            "size-change": this.onSizeChange,
            "current-change": this.onCurrentChange
          }
        }}
      ></el-pagination>
    );
  }
};

export {
  PaginationModel
};
</script>
