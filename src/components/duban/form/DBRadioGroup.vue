<template>
<!--  <div>{{label}}</div>-->
  <el-radio-group v-model="modelValue" @change="handleChange" v-bind="$attrs">
    <el-radio :label="item.label" v-for="item in list" :key="item.label" :value="item.value" v-bind="componentAttrs(item)"></el-radio>
  </el-radio-group>
</template>

<script>
// todo list上添加v-bind
import _ from 'lodash'
export default {
  name: "DBRadioGroup",
  props: ['modelValue', 'list'],
  methods: {
    handleChange(value) {
      this.$emit('update:modelValue', value)
    },
    componentAttrs(item){
      return _.omit(item, ['label', 'value'])
    }
  }
}
</script>

<style lang="scss" scoped>
.DBRadioGroup {
}
</style>
