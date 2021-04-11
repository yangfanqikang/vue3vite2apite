<template>
  <div class="child">
    {{ $attrs }}
  </div>
  <grandson></grandson>
</template>

<script>
import Grandson from "./grandson.vue";
export default {
  name: "child",
  components: {Grandson}
}
</script>

<style lang="scss" scoped>
.child {
}
</style>
