<template>
<!--  <div>{{label}}</div>-->
  <el-checkbox-group v-model="modelValue" @change="handleChange">
    <el-checkbox :label="item.label" v-for="item in list" :key="item.label" :value="item.value" v-bind="componentAttrs(item)"></el-checkbox>
  </el-checkbox-group>
</template>
<script>
import _ from "lodash";

export default {
  name: 'vmodel',
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
