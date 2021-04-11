<template>
  <div class="grid-container" :style="JSONData.styleVars">
    <div class="grid-box" v-for="(item,index) in JSONData.list" :key="item.sort" :style="item.style">
      <div>{{item.componentName}}--{{index}}</div>
      <span class="resize" ref="resize" @mousedown.stop="e=>handleMouseDown(e,1,item)">▶</span>
      <span class="vresize" ref="resize" @mousedown.stop="e=>handleMouseDown(e,2,item)">▼</span>
    </div>
  </div>
  <pre>{{JSON.stringify(JSONData.list, null, 4)}}</pre>
</template>
<script>
import { ref, reactive, nextTick } from 'vue'
import _ from 'lodash'
export default {
  name: 'grid-container',
  setup() {
    const JSONData = reactive({
      // css变量
      styleVars: {
        // 纵向排列大小,是用比例做还是数值做,思考一下,默认为1fr
        // '--gridTemplateColumns': '100px 200px',
        '--gridTemplateColumns': 'repeat(12, 1fr)',
        // '--gridAutoColumns': 'minmax(36px, auto)',
        // 默认行高
        '--gridAutoRows': '50px',
        // 默认间距
        '--gridGap': '1px'
      },
      list: [
        {
          gridRowEnd: 'span 2',
          sort: 0,
          componentName: '下拉列表',
          style: {
            // 行偏移2格
            gridRowEnd: 'span 2',
            // 列偏移2格
            gridColumnEnd: 'span 2'
            // height: '30px'
          }
        },
        {
          sort: 1,
          componentName: '表单',
          style: {
            gridRowEnd: 'span 2',
            // 列偏移2格
            gridColumnEnd: 'span 2'
          }
        },
        {
          sort: 2,
          componentName: '表单',
          style: {
            gridRowEnd: 'span 1',
            // 列偏移2格
            gridColumnEnd: 'span 1'
          }
        },
        {
          sort: 2,
          componentName: '表单',
          style: {
            gridRowEnd: 'span 1',
            // 列偏移2格
            gridColumnEnd: 'span 1'
          }
        },
        {
          sort: 2,
          componentName: '表单',
          style: {
            gridRowEnd: 'span 1',
            // 列偏移2格
            gridColumnEnd: 'span 1'
          }
        },
        {
          sort: 2,
          componentName: '表单',
          style: {
            gridRowEnd: 'span 1',
            // 列偏移2格
            gridColumnEnd: 'span 1'
          }
        },
        {
          sort: 2,
          componentName: '表单',
          style: {
            gridRowEnd: 'span 1',
            // 列偏移2格
            gridColumnEnd: 'span 1'
          }
        },
        {
          sort: 2,
          componentName: '表单',
          style: {
            gridRowEnd: 'span 1',
            // 列偏移2格
            gridColumnEnd: 'span 1'
          }
        },
        {
          sort: 2,
          componentName: '表单',
          style: {
            gridRowEnd: 'span 1',
            // 列偏移2格
            gridColumnEnd: 'span 1'
          }
        },
        {
          sort: 2,
          componentName: '表单',
          style: {
            gridRowEnd: 'span 1',
            // 列偏移2格
            gridColumnEnd: 'span 1'
          }
        },
        {
          sort: 2,
          componentName: '表单',
          style: {
            gridRowEnd: 'span 1',
            // 列偏移2格
            gridColumnEnd: 'span 1'
          }
        },
        {
          sort: 2,
          componentName: '表单',
          style: {
            gridRowEnd: 'span 1',
            // 列偏移2格
            gridColumnEnd: 'span 1'
          }
        },
        {
          sort: 2,
          componentName: '表单',
          style: {
            gridRowEnd: 'span 1',
            // 列偏移2格
            gridColumnEnd: 'span 1'
          }
        },
        {
          sort: 2,
          componentName: '表单',
          style: {
            gridRowEnd: 'span 1',
            // 列偏移2格
            gridColumnEnd: 'span 1'
          }
        },
        {
          sort: 2,
          componentName: '表单',
          style: {
            gridRowEnd: 'span 1',
            // 列偏移2格
            gridColumnEnd: 'span 1'
          }
        },
        {
          sort: 2,
          componentName: '表单',
          style: {
            gridRowEnd: 'span 1',
            // 列偏移2格
            gridColumnEnd: 'span 1'
          }
        },
        {
          sort: 2,
          componentName: '表单',
          style: {
            gridRowEnd: 'span 1',
            // 列偏移2格
            gridColumnEnd: 'span 1'
          }
        },
        {
          sort: 2,
          componentName: '表单',
          style: {
            gridRowEnd: 'span 1',
            // 列偏移2格
            gridColumnEnd: 'span 1'
          }
        },
        {
          sort: 2,
          componentName: '表单',
          style: {
            gridRowEnd: 'span 1',
            // 列偏移2格
            gridColumnEnd: 'span 1'
          }
        },
        {
          sort: 2,
          componentName: '表单',
          style: {
            gridRowEnd: 'span 1',
            // 列偏移2格
            gridColumnEnd: 'span 1'
          }
        },
        {
          sort: 2,
          componentName: '表单',
          style: {
            gridRowEnd: 'span 1',
            // 列偏移2格
            gridColumnEnd: 'span 1'
          }
        }
      ]
    })
    const isDown = ref(false)
    const position = reactive({
      startX: 0,
      endX: 0,
      startY: 0,
      endY: 0
    })
    let lock = false
    const handleMouseDown = (e, type, item) => {
      // e.target.style.background = 'green'
      lock = false
      if (type === 1) {
        position.startX = e.clientX
        console.log('>>>position.startX', position.startX)
      } else {
        position.startY = e.clientY
        console.log('>>>', position.startY)
      }
      document.onmousemove = (e) => {
        lock = true
        if (type === 1) {
          position.endX = e.clientX
          console.log('endX', position.endX)
        } else {
          position.endY = e.clientY
          console.log('endY', position.endY)
        }
        createElementDiv(e, type)
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        if (lock) {
          if (document.querySelector('#_line')) {
            document.body.removeChild(document.querySelector('#_line'))
          }
          if (type === 1) {
            // 右侧拖拽
            const moveLength = position.endX - position.startX
            if (Math.abs(moveLength) < 10) return
            console.log('moveLength', moveLength)
            const moveCount = Math.abs(parseInt(moveLength / 50)) > 0 ? parseInt(moveLength / 50) : (moveLength > 0 ? 1 : -1)
            console.log('moveCount', moveCount)
            // 最大12和最小1宽度限制
            const count = item.style.gridColumnEnd.split(' ')[1] * 1 + moveCount
            if (count <= 1) {
              item.style.gridColumnEnd = 'span 1'
            } else if (count >= 12) {
              item.style.gridColumnEnd = 'span 12'
            } else {
              item.style.gridColumnEnd = 'span ' + (item.style.gridColumnEnd.split(' ')[1] * 1 + moveCount)
            }
          } else {
            const moveLength = position.endY - position.startY
            if (Math.abs(moveLength) < 15) return
            // 下侧拖拽
            console.log('moveLength>>>', moveLength)
            const moveCount = Math.abs(parseInt(moveLength / 50)) > 0 ? parseInt(moveLength / 50) : (moveLength > 0 ? 1 : -1)
            console.log('moveCount', moveCount)
            const count = item.style.gridRowEnd.split(' ')[1] * 1 + moveCount
            if (count <= 1) {
              item.style.gridRowEnd = 'span 1'
            } else {
              item.style.gridRowEnd = 'span ' + (item.style.gridRowEnd.split(' ')[1] * 1 + moveCount)
            }
          }
        }
      }
    }

    const createElementDiv = (e, type) => {
      if (document.querySelector('#_line')) {
        document.body.removeChild(document.querySelector('#_line'))
      } else {
        const cDiv = document.createElement('div')
        cDiv.style.position = 'fixed'
        if (type === 1) {
          cDiv.style.left = e.clientX + 'px'
          cDiv.style.top = '0'
          cDiv.style.height = '100%'
          cDiv.style.borderRight = '1px dashed green'
        } else {
          cDiv.style.top = e.clientY + 'px'
          cDiv.style.left = '0'
          cDiv.style.width = '100%'
          cDiv.style.borderTop = '1px dashed green'
        }

        cDiv.style.zIndex = '10'
        cDiv.id = '_line'
        document.body.appendChild(cDiv)
      }
    }

    return {
      handleMouseDown,
      isDown,
      JSONData
    }
  }
}
</script>
<style scoped lang="scss">
.grid-container {
  width: 865px;
  user-select: none;
  display: grid;
  grid-template-columns: var(--gridTemplateColumns);
  grid-auto-columns: var(--gridAutoColumns);
  // 默认行高50px
  grid-auto-rows: var(--gridAutoRows);
  grid-gap: var(--gridGap);
  border: 2px solid red;
  background-color: red;
  >div{
    background-color: #fff;
    position: relative;
    >.resize{
      position: absolute;
      top: 0;
      right: 0;
      &:hover{
        color: red;
        cursor: w-resize;
      }
    }
    .vresize{
      position: absolute;
      bottom: 0;
      left: 50%;
      height: 100%;
      display: grid;
      align-items: end;
      &:hover{
        color: red;
        cursor: n-resize;
      }
    }
  }
}
</style>
