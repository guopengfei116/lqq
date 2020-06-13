<template>
  <div class="builder">
    <component
      v-if="dynamicCom"
      :is="dynamicCom"
      ref="dynamicComRef"
      v-bind="$attrs"
    ></component>
  </div>
</template>

<script>
import { builder } from "lqq-core/lib/module-di";

export default {
  name: "Builder",

  inheritAttrs: false,

  props: {
    inject: {
      type: Object,
      validator(value) {
        return !!value.module;
      }
    }
  },

  data() {
    return {
      dynamicCom: null
    };
  },

  watch: {
    inject() {
      this.init();
    }
  },

  mounted() {
    this.init();
  },

  methods: {
    async init() {
      if (!this.inject) {
        return (this.dynamicCom = null);
      }

      const { module, component } = this.inject;
      this.dynamicCom = await builder(module, component);

      // other-option is builder-component costom
      this.$nextTick(() => {
        const comRef = this.$refs.dynamicComRef;
        const payload = {ref: comRef, ...(comRef.$options.other || {}), }
        this.$emit("complete", payload);
      });
    }
  }

  // render(h) {
  //   if (this.dynamicCom) {
  //     return h(this.dynamicCom);
  //   } else {
  //     return h();
  //   }
  // }
};
</script>
