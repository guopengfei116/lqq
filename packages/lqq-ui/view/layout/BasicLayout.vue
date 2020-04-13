<template>
  <el-container class="app">
    <qq-nav :logo="logo" :menus="menus" :collapse="isUnfold">
      <slot name="logo"></slot>
    </qq-nav>

    <el-container class="app_container">
      <qq-header
        :is-unfold="isUnfold"
        :on-switch="onSwitch"
        :user="user"
        v-bind="header"
      >
        <template v-slot:left>
          <slot name="headerl"></slot>
        </template>
        <template v-slot:center>
          <slot name="headerc"></slot>
        </template>
        <template v-slot:right>
          <slot name="headerr"></slot>
        </template>
      </qq-header>

      <el-main class="app_container_main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Container, Main } from "element-ui";
import QqNav from "lqq-ui/view/frame/Nav";
import QqHeader from "lqq-ui/view/frame/Header";

export default {
  name: "QqBasicLayout",

  components: {
    [Container.name]: Container,
    [Main.name]: Main,
    QqNav,
    QqHeader
  },

  props: {
    logo: {
      type: String,
      default: "QQ"
    },

    menus: {
      type: Array,
      default: () => []
    },

    header: {
      type: Object,
      default: () => ({
        app: "qq"
      })
    },

    user: {
      type: Object,
      default: () => ({
        name: "gpf",
        tooltip: "hello gpf"
      })
    }
  },

  data() {
    return {
      isUnfold: false
    };
  },

  methods: {
    onSwitch(value) {
      this.isUnfold = value;
    }
  }
};
</script>

<style lang="less" scoped>
.app {
  height: 100vh;
  background-color: #eef0f8;
  &_container {
    flex-direction: column;
    &_main {
      overflow: scroll;
      flex: 1;
    }
  }
}
</style>
