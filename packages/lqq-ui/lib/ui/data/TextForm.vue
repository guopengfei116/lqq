<script>
export default {
  name: "TextForm",

  functional: true,

  render(h, context) {
    return (
      <section>
        <mo-text-plain {...context.data}></mo-text-plain>
      </section>
    );
  }
};
</script>

<style lang="less" scoped>
/deep/.plain-text {
  .row {
    margin-bottom: 18px;
    font-size: 14px;
    line-height: 32px;

    .item_label {
      float: left;
      padding-right: 12px;
      // color: #606266;
    }

    .item_value {
      cursor: not-allowed;
      padding: 0 15px;
      border: 1px solid rgb(200, 199, 221);
      border-radius: 4px;
      background-color: #f5f7fa;
      color: #c0c4cc;
    }
  }
}
</style>
