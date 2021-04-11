<template>
  <div class="try">
    try
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, reactive} from "vue";
interface Student {
  name: string,
  class: string,
  age: number
}
export default defineComponent({
  name: "try",
  props : {
    success: {
      type: String
    },
    callback: {
      type: Function as PropType<()=>void>
    },
    student: {
      type: Object as PropType<Student>,
      required: true
    }
  },
  setup(){
    const student = reactive<Student>({name: '111', class: '222', age: 1})
  },
//  自定义hooks
})
</script>

<style lang="scss" scoped>
.try {
}
</style>
