<template>
  <el-aside class="aside">
    <!-- logo -->
    <div class="header">
      <slot>
        <strong :class="['logo', collapse ? 'logo--collapse' : '']">{{
          logo
        }}</strong>
      </slot>
    </div>

    <!-- nav -->
    <el-menu
      class="menu"
      :style="{ width: collapse ? 'auto' : '200px' }"
      :default-active="matchedMenuId"
      :collapse="collapse"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <qq-nav-item v-for="menu in menus" :menu="menu" :key="menu.id" />
    </el-menu>
  </el-aside>
</template>

<script>
import { Aside, Menu } from "element-ui";
import findMenuId from "../../helper/menu";

import QqNavItem from "./NavItem";

export default {
  name: "Nav",

  components: {
    [Aside.name]: Aside,
    [Menu.name]: Menu,
    QqNavItem
  },

  props: {
    logo: {
      type: String,
      required: true
    },

    collapse: {
      type: Boolean,
      default: false
    },

    menus: {
      type: Array,
      required: true
    }
  },

  computed: {
    matchedMenuId() {
      const { query, path } = this.$route;
      const menuId = query.menuid || findMenuId(this.menus, path);

      console.info(`导航菜单：${menuId}`);
      return String(menuId);
    }
  }
};
</script>

<style lang="less" scoped>
.aside {
  width: auto !important;
  height: 100vh;

  .header {
    padding: 10px 8px;
    background-color: #111111;
  }

  .logo {
    display: block;
    height: 28px;
    line-height: 28px;
    text-align: center;
    font-size: 20px;
    color: #ff3f3f;
    background: rgba(151, 126, 126, 0.2);
    border-radius: 26px;
    &--collapse {
      font-size: 14px;
    }
  }

  .menu {
    overflow-y: auto;
    height: calc(100vh - 48px);
    background-color: #24292e;
  }
}
</style>
