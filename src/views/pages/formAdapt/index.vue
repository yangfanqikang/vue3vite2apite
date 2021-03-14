<template>
  <div class="form-adapt-container">
<!--    <DBForm :config="config" ref="table" ></DBForm>-->
    <DBForm :config="configData"></DBForm>
    <DBTable :config="config" ref="table" ></DBTable>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive } from "vue";

import {getJSON} from "../../../api/menu";
export default {
  name: "formAdapt",
  // setup() {
  //   const state = reactive({
  //     form: {},
  //   });
  //   return {
  //     ...toRefs(state),
  //   };
  // },
  data() {

    return {
      config: {
        headers: [
          {prop: 'contractCode', label: '业务编号', attrs: {width: 200, align: 'center'}},
          {prop: 'payeeAcctName', label: '收款账户名', attrs: {width: 260, align: 'right'}},
          {prop: 'tradeAmt', label: '付款金额'},
          // {prop: 'status', label: '操作状态', type: 'Enum', Enum: {name: 'order'}},
          {prop: 'statistic', label: '预警统计'},
          {prop: 'payTime', label: '付款时间'},
          {prop: 'reason', label: '原因'},
          // {prop: 'monitorStatus', label: '当前监控状态', type: 'Enum', Enum: {name: 'monitor'}},
          // {prop: 'customize', label: '自定义展示', type: 'Format', format: val => this.customize(val)},
          {prop: 'opt', label: '操作'},
        ],
        loadData: () => Promise.resolve({
          data: [
            {id: 1, contractCode: '', payeeAcctName: '中国银行上海分行', tradeAmt: '503869.265', status: '00', payTime: 1593585652530,
              statistic:[
                {level: 3, total: 5},
                {level: 2, total: 7},
                {level: 1, total: 20},
                {level: 0, total: 0}
              ],
              customize: ['中国', '上海', '浦东新区']
            },
            {id: 2, contractCode: 'GLP-YG-B3-1111', payeeAcctName: '中国邮政上海分行', tradeAmt: '78956.85', status: 'CREATED', payTime: 1593416718317,
              reason: 'Popover的属性与Tooltip很类似，它们都是基于Vue-popper开发的，因此对于重复属性，请参考Tooltip的文档，在此文档中不做详尽解释。',
            },
            {id: 3, contractCode: 'HT1592985730310', payeeAcctName: '招商银行上海支行', tradeAmt: '963587123', status: 'PASS', payTime: 1593420950772, monitorStatus: '01'},
            {id: 4, contractCode: 'pi239', payeeAcctName: '广州物流有限公司', tradeAmt: '875123966', status: 'REJECT', payTime: 1593496609363},
            {id: 5, contractCode: '0701001', payeeAcctName: '建设银行上海分账', tradeAmt: '125879125', status: 'REFUSE', payTime: 1593585489177},
          ],
        }),
      },
      configData: {
        //
        columns: [
          { defaultValue: '111', prop: "name", label: "借款人名称", is: "autocomplete"},
          { defaultValue: '', prop: "certificateId", is: "input", label: "统一信用代码", rules: [{required: true, message: '请输入统一信用代码'}] },
          { defaultValue: '', prop: 'daterange', label: "日期范围", is: 'dateRangerPicker', },
          { defaultValue: '', prop: 'date', label: "日期", is: 'datePicker', },
          { defaultValue: '', prop: 'status', label: "状态", is: 'DBSelectGroup' },
          { defaultValue: '', prop: 'currencyId', label: "币别", is: 'DBSelectGroup', list: [{label: 'male', value: "男"}, {label: 'famale', value: "女", disabled: true}] },   //异步获取字典项
          { defaultValue: '', prop: "password", label: "密码", type: 'password',is: "input", },
          { defaultValue: '', prop: "confimPass", label: "确认密码", type: 'password',is: "input",},
          { defaultValue: '', prop: 'remark', label: "备注", type: 'textarea',is: "input", },
          { defaultValue: '', prop: "email", label: "邮箱",is: "input" ,rules: [{ required: true, message: '请输入邮箱地址' }, { type: 'email', message: '请输入正确的邮箱地址' }] },
          { defaultValue: '', prop: 'remember', label: '记住密码', is: 'checkbox' },
          { defaultValue: '', prop: 'gender', label: '性别', is: 'DBRadioGroup', list: [{label: 'male', value: "男"}, {label: 'famale', value: "女", disabled: true}] },
          { defaultValue: [], prop: 'love', label: '爱好', is: 'DBCheckboxGroup', list: [{label: '篮球', value: "0"}, {label: '排球', value: "1"}, {label: '足球', value: "2", disabled: true}] },
          { defaultValue: '', prop: "delivery", label: "即时配送", is: 'switch' },
        ],
        // attrs: {
        //   span: 24,
        // }
      }
    }
  },
  mounted (){
    getJSON().then((res: any) => {
      console.log(res)
      // callback(res)
    })
  },
  methods: {

  }
};
</script>
