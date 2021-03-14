<template>
<!--  <div>{{label}}</div>-->
  <el-select v-model="modelValue" @change="handleChange" v-bind="$attrs">
    <el-option
        v-for="item in list"
        :key="item.value"
        :label="item.label"
        v-bind="componentAttrs(item)"
        :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'DBSelectGroup',
  props: ['modelValue', 'list'],
  setup(props, ctx){
    const handleChange = (value)=>{
      ctx.emit('update:modelValue',value)
    }
    const componentAttrs = (item)=>{
      return _.omit(item, ['label', 'value'])
    }
    return {
      handleChange,
      componentAttrs
    }
  }
}
</script>
