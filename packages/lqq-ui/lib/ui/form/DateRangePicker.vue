<script>
import Vue from "vue";
import { DatePicker } from "element-ui";
import { getShortcuts } from "../../helper/date-picker";

Vue.use(DatePicker);

export default {
  name: "DateRangePicker",

  functional: true,

  render(h, context) {
    const { props } = context;
    const shortcuts = getShortcuts(props.shortcutsAs);

    return (
      <el-date-picker
        align="right"
        size="small"
        unlink-panels
        {...context.data}
        picker-options={{ shortcuts, ...props.pickerOptions }}
      ></el-date-picker>
    );
  }
};
</script>
