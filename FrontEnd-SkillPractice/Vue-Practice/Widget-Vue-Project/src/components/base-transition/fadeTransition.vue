<template>
  <component :is="componentType"
             :tag="tag"
             v-bind="$attrs"
             v-on="hooks"
             enter-active-class="fadeIn"
             move-class="fade-move"
             leave-active-class="fadeOut">
    <slot></slot>
  </component>
</template>
<script>
  import baseTransition from '../mixins/baseTransition.js'
  export default {
    name: 'fade-transition',
    mixins: [baseTransition]
  }
</script>
<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .fadeIn {
    animation-name: fadeIn;
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  .fadeOut {
    animation-name: fadeOut;
  }
  /* 手动添加了一个move类，指定transform持续的时间 */
  .fade-move {
    transition: transform .3s ease-out;
  }
</style>