<template>
  <div class="form-adapt-container">
    <el-button type="primary" @click="getChecked">buttonCont</el-button>
<!--    <DBForm :config="config" ref="table" ></DBForm>-->
    <DBForm :config="configData" ref="form"></DBForm>
    <el-button type="primary" @click="submit">buttonCont</el-button>
    <DBTable :config="config" ref="table" @rowDblClick="rowDblClick"></DBTable>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive } from "vue";
import dayjs from 'dayjs'
import {getQueryData, getTypeList} from "../../../api/menu";
import {getActions, getTHeaders} from "../../../components/duban/form/const";
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
        headers: getTHeaders(['type','time', 'content']),
        loadData: p => getQueryData({...this.setParams(), ...p}),
        hasCheckbox: true,
        hasIndex: true,
        selectable: this.selectable,
        reserveSelection: false,
        rowKey: row => row.id,
        on: {
          // click: this.rowDblClick,
        },
        onEvents: {
          rowDblclick: this.rowDblclick2,
          sortChange: this.sortChange,
          selectionChange: this.selectionChange
        },
        actions: getActions(['action1','action2'])
      },
      configData: {
        //
        columns: [
          { defaultValue: '', prop: 'type', label: "公示类型", is: 'DBSelectGroup',list: []},
          { defaultValue: '', prop: 'daterange', label: "日期范围", is: 'dateRangerPicker', },
        ],
        // attrs: {
        //   span: 24,
        // }
      }
    }
  },
  mounted (){
    this.getType()
    // this.getTableData()

  },
  methods: {
    selectionChange(v){
      console.log(v)
      // console.log(this.$refs.table.getChecked())
      debugger
    },
    rowDblclick2(val){
      console.log(val)
    },
    sortChange(val){
      console.log(val)
    },
    getChecked(){
      console.log(this.$refs.table.getChecked())
    },
    // 设置是否禁用
    selectable(item){
      // this.$message.success('aslkdjfalksdjflk;asdf')
      return true
    },
    getType(){
      getTypeList().then((res: any) => {
        if (res.code === 0){
          this.configData.columns[0].list = res.result.data
        }
        // callback(res)
      })
    },
    rowDblClick(val){
      this.$message.success(JSON.stringify(val))
    },
    setParams(){
      // 所需要的参数
      // this.$nextTick(() =>{
      //   return this.$refs.form.form
      // })
      return {
        type: '',
        daterange: ''
      }
    },
    submit(val) {
      console.log(val)
      // 设置请求的参数
      this.setParams()
      // 触发请求
      this.$refs.table.load(this.$refs.form.form)
    }
  }
};
</script>
