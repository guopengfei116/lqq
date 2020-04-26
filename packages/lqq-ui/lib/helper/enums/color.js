import { Enums } from "lqq-util/lib/class";

// 常用语义颜色
export const colorTuple = [
  ["#67C23A", "success", "绿色"],
  ["#FF7878", "danger", "红色"],
  ["#F0B762", "warn", "黄色"],
  ["#4360FF", "primary", "蓝色"],
  ["#909399", "info", "灰色"],
  ["#0E153B", "font", "黑色"],
  ["#3550E1", "link", "深蓝"],
  ["#717094", "placeholder", "灰蓝"],
  ["#409EFF", "mark", "青蓝"]
];

export default Enums.create(colorTuple, 1, 0);
