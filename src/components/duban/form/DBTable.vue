<template>
  <div class="db-table">
    <el-table :data="cfg.data" style="width: 100%" v-on="getOnEvent()" v-bind="attrs" v-loading="loading">
      <el-table-column v-if="cfg.hasCheckbox" v-bind="selectionAttrs" type="selection" width="39" label="xx" />
      <el-table-column label="序号" type="index" show-overflow-tooltip width="50" v-if="cfg.hasIndex">
      </el-table-column>
      <el-table-column v-for="n in cfg.headers" :prop="n.prop" :label="n.label" :key="n.prop" v-bind="{...columnAttrs, ...n.attrs, ...handleAttrs(n)}">
        <template v-slot="{row}">
          <slot :name="n.prop" :row="row"><Cell :config="n" :data="row" /></slot>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        class="pagination"
        v-if="showPage"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10,30,50]"
        :page-size="page.size"
        :total="page.total"
        :current-page="page.page"
        @current-change="loadPage"
        @size-change="sizeChange"
    />
  </div>
</template>

<script>
// todo 处理序号,索引
import Cell from './cell.vue'
import _ from 'lodash'
export default {
  name: "DBTable",
  components: {
    Cell,
  },
  props: {
    config: Object,
  },
  data(){
    const config = this.config
    return {
      loading: true,
      columnAttrs: {
        align: 'left',
        resizable: false,
      },
      cfg: {
        on: this.getTableEvents(),
        attrs: {
          border: true,
          stripe: true,
        },
        data: [],
        ...this.config,
        headers: config.actions ? config.headers.concat(config.actions) : config.headers,
      },
      page: {
        size: this.config.size || 10,
        page: 1,
        total: 0,
      },
      checked: []
    }
  },
  created(){
    this.load();
  },
  computed: {
    selectionAttrs(){
      let {selectable, reserveSelection = false} = this.config || {}, obj = {};
      // checkBox是否可以被选中
      if(selectable && typeof selectable == 'function'){
        Object.assign(obj, {
          selectable,
        })
      }
      //reserve-selection仅对type=selection的列有效，类型为Boolean，为true则会在数据更新之后保留之前选中的数据（需指定 row-key）
      if(reserveSelection){
        Object.assign(obj, {
          'reserve-selection': reserveSelection,
        })
      }

      return obj;
    },
    attrs(){
      let {config: {spanMethod, rowKey}, cfg: {attrs}} = this;
      // 合并单元格 - spanMethod是父组件传过来的合并单元格的方法，请参照element合并单元格
      if(spanMethod && typeof spanMethod == 'function'){
        Object.assign(attrs, {
          'span-method': spanMethod,
        })
      }
      // 表格跨页选中，需要设置row-key和reserve-selection，reserve-selection只能且必须设置在type为selection的el-table-column上
      if(rowKey && typeof rowKey == 'function'){
        Object.assign(attrs, {
          'row-key': rowKey,
        })
      }
      return attrs;
    },
    showPage(){
      let {size, total} = this.page;
      return size < total;
    },
  },
  methods: {
    handleAttrs(item){
      return _.omit(item,['label', 'prop', 'attrs'])
    },
    getOnEvent(){
      let {onEvents = {}} = this.config || {}
      return onEvents
    },
    getTableEvents(){
      let {hasCheckbox = false} = this.config || {}, events = {}, _this = this;
      if(hasCheckbox){
        // 绑定事件
        Object.assign(events, {
          'selectionChange'(v){
            _this.checked = v;
          },
        });
      }
      return events;
    },
    // 获取勾选的行
    getChecked(){
      return this.checked;
    },
    // 请求数据
    load(p = {}){
      let { size, page } = this.page, {loadData = () => Promise.resolve({})} = this.config;
      this.loading = true;
      // 这里loadData的参数在初始化时只有分页所需的page和size，至于接口需要的其他参数，是在父组件的loadData中传递
      loadData({...p, page, size}).then((res) => {
        console.log(res)
        let {data, total,page} = res.result
        this.cfg.data = data;
        this.page.page = page;
        this.page.total = total;
        this.loading = false;
      });
    },
    loadPage(index){
      this.page.page = index
      this.load();
    },
    sizeChange(size){
      this.page.size = size
      this.load();
    },
    // 一般在点击查询按钮或局部刷新表格列表时，可调用此方法，如果不传参数，则默认从第一页开始
    reload(p = {}){
      this.page.page = 1
      this.load(p);
    },
  },
}
</script>
<style lang="scss">
.db-table{
  box-sizing: initial;
}
</style>
