<script>
import { Pagination } from "element-ui";
import { overwrite } from "lqq-util/lib/object";
import PaginationOffsetModel from "./PaginationOffsetModel";

export default {
  name: "PaginationOffset",

  components: {
    [Pagination.name]: Pagination
  },

  props: {
    defaultData: {
      type: PaginationOffsetModel,
      default: () => new PaginationOffsetModel()
    },

    pageSizes: {
      type: Array,
      default: () => PaginationOffsetModel.pageSizes
    },

    total: {
      type: Number,
      default: 0
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
        new PaginationOffsetModel(),
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

  render(h, context) {
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
  PaginationOffsetModel
};
</script>
