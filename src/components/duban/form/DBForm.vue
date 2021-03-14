<template>
  <el-form :inline="true" ref="form" :model="form" :rules="rules" label-position="left" size="small" label-width="110px">
    <el-row :gutter="20">
      <el-col v-bind="attrs" v-for="(x, idx) in columns" :key="idx">
        <el-form-item :label="x.label" :prop="x.prop">
          <component v-model="form[x.prop]" v-bind="componentAttrs(x)" :is="TYPE[x.is].is" />
        </el-form-item>
<!--        <p>x&#45;&#45;{{x}}</p>-->
<!--        <p>is=>{{TYPE[x.is].is || (x.label + '>>>>>>>>>') }}</p>-->
      </el-col>
    </el-row>
    <div class="searchBtn" v-if="footer">
      <el-button class="filter-item" @click="reset">重置</el-button>
      <el-button class="filter-item" type="primary" @click="submit">查询</el-button>
    </div>
  </el-form>
</template>

<script>
// import { fromEntries } from '@/utils'
import { h, getCurrentInstance } from 'vue'
import _ from 'lodash'
import DBSelectGroup from "./DBSelectGroup.vue";
import DBCheckboxGroup from "./DBCheckboxGroup.vue";
import DBRadioGroup from "./DBRadioGroup.vue";
export default {
  name: 'DBForm2',
  props: {
    config: Object,
  },
  components: {
    DBRadioGroup,
    DBCheckboxGroup,
    DBSelectGroup,
  },
  data(){
    const { columns = [], data = {} } =  this.config || {}

    return {
      TYPE: {
        DBSelectGroup: {
          is: 'DBSelectGroup',
          clearable: true,
        },
        input: {
          is: 'el-input',
          clearable: true,
        },
        switch: {
          is: 'el-switch',
        },
        checkbox: {
          is: 'el-checkbox',
          clearable: true,
        },
        DBCheckboxGroup: {
          is: 'DBCheckboxGroup',
          clearable: true,
        },
        DBRadioGroup: {
          is: 'DBRadioGroup',
          clearable: true,
        },
        dateRangerPicker: {
          is: 'el-date-picker',
          type:"daterange",
          "range-separator":"至",
          "start-placeholder":"开始日期",
          "end-placeholder":"结束日期",  //文本框是否可输入，默认为true可输入
        },
        datePicker: {
          is: 'el-date-picker',
          type: "date",
        },
        autocomplete: {
          is: 'el-autocomplete'
        }
      },
      attributes: {
        // lg: 6,
        md: 8,
        // xs: 24,
      },
      form: Object.fromEntries(columns.map(item=>[item.prop,item.defaultValue])),
      rules: columns.reduce((r, c) => ({...r, [c.prop]: c.rules ? c.rules : []}), {}),
      columns,
      list: [{label: '篮球', value: "0"}, {label: '排球', value: "1"}, {label: '足球', value: "2"}],
      defaultValue: ['0'],
      rangeValue: ['篮球'],
      radioValue: 'male',
      list2: [{label: 'male', value: "男"}, {label: 'famale', value: "女"}],
      selectValue: '0',
      list3: [{label: '篮球', value: "0"}, {label: '排球', value: "1"}, {label: '足球', value: "2", disabled: true}],
    }
  },
  computed: {
    attrs(){
      const { attrs = this.attributes } =  this.config || {};
      return attrs
    },
    footer(){
      const { footer = true } =  this.config || {}
      return footer
    },
  },
  mounted(){
    this.reset();
  },
  methods: {
    checkChange(value){
      console.log(value)
    },
    componentAttrs(item) {
      // 如果不存在则默认为text
      // const {is = 'text', label} = item, attrs = Object.fromEntries(Object.entries(item).filter(n => !/^(prop|is|rules)/.test(n[0]))),
      const {is,label} = item
          const placeholder = (/^(select|el-date-picker)/.test(is) ? '请选择' : '请输入') + label;
      // return { ...this.TYPE[item.is || 'text'], placeholder}
      const attrs = _.omit(item,['defaultValue','label','rules'])
      const typeDefaultAttrs = this.TYPE[item.is]
      // 处理type默认属性
      return {...attrs, placeholder,...typeDefaultAttrs}
    },
    reset() {
      this.$refs.form.resetFields();
    },
    /*
     * 这里区分了两种情况(footer默认为true，代表默认会展示封装的form组件所自带的查询、重置按钮)：
     * 1、不使用封装的form组件中自带的查询、重置按钮，则需要使用回调的方式获取form表单的值
     * 2、使用封装的form组件中自带的查询、重置按钮，则需要在使用时通过父组件向封装的form子组件传一个函数submit来获取form表单的值
    */
    submit(cb = noop) {
      // 第一种情况
      !this.footer && this.$refs.form.validate(valid => valid && cb(this.form));
      // 第二种情况
      this.footer && this.$refs.form.validate(valid => valid && this.$emit('submit', this.form));
      console.log(this.form)
      debugger;
    },
  }
}
</script>
<style scoped>
.width100{width: 100%;}
</style>
