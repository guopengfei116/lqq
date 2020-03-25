<script>
import Vue from "vue";
import { Select, Option } from "element-ui";
import { Enums } from "lqq-util/lib/class";

Vue.use(Select);
Vue.use(Option);

export default {
  name: "QqEnums",

  functional: true,

  props: {
    data: {
      type: Enums
    }
  },

  render(h, context) {
    let { data } = context.props;
    data = data || new Enums();

    return (
      <el-select {...context.data}>
        {context.data.slots && context.data.slots.default}
        {data.tuple.map(([name, value]) => (
          <el-option label={name} key={value} value={value}></el-option>
        ))}
      </el-select>
    );
  }
};
</script>
