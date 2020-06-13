<template>
  <!-- nav item -->
  <el-menu-item
    v-if="!menu.children || !menu.children.length"
    :index="menu.id.toString()"
    @click="onMenuClick(menu)"
  >
    <p style="margin: 0">
      <i :class="menu.icon || 'el-icon-document'"></i>
      <span>{{ menu.text }}</span>
    </p>
  </el-menu-item>

  <!-- recursion -->
  <el-submenu v-else :index="String(menu.id)">
    <template slot="title" class="icon-s-platform">
      <i :class="menu.icon || 'el-icon-menu'"></i>
      <span>{{ menu.text }}</span>
    </template>
    <qq-nav-item
      v-for="subMenu in menu.children"
      :menu="subMenu"
      :key="subMenu.id"
    ></qq-nav-item>
  </el-submenu>
</template>

<script>
import { Submenu, MenuItem } from "element-ui";

export default {
  name: "NavItem",

  components: {
    [Submenu.name]: Submenu,
    [MenuItem.name]: MenuItem
  },

  props: {
    menu: {
      type: Object,
      required: true,
      validator(prop) {
        return ["id", "text", "url"].every(property =>
          Object.prototype.hasOwnProperty.call(prop, property)
        );
      }
    }
  },

  methods: {
    onMenuClick(menu) {
      this.$router.push({ path: menu.url, query: { menuid: menu.id } });
    }
  }
};
</script>
