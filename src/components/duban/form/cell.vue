<!--<template>-->
<!--  <div class="cell">-->
<!--    {{data[config.prop]}}-->
<!--  </div>-->
<!--</template>-->

<script>
import * as Components from './components';
import {h, getCurrentInstance, defineComponent} from 'vue'
let empty = '-'
export default defineComponent({
  name: "cell",
  props: {
    config: Object,
    data: Object,
  },
  functional: true,
  render() {
    let c = getCurrentInstance();
    let {props: {config = {}, data = {}}} = c, {prop, type = 'Default'} = config, value = data[prop] || config.value, isEmpty = value === '' || value === undefined;
    // console.log('>>>>>>>>>>>', c.get('props'));
    // console.log( config, data )
    return isEmpty ? h(Components.Default, {props: {value: empty}}) : h(Components[type], {props: {value, empty, data, ...config}});
    // return h(Components.Default, {props: empty})
    // return h('input', {value: '1aaaa'})
  }
})
</script>
