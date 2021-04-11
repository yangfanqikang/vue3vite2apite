<template>
  <div class="grid-container" :style="JSONData.styleVars">
    <div class="grid-box" v-for="(item,index) in JSONData.list" :key="item.sort" :style="item.style">
      <div>{{item.componentName}}--{{index}}</div>
      <div class="resize" ref="resize" @mousedown.stop="e=>handleMouseDown(e,item)"></div>
    </div>
  </div>
  <pre>{{JSON.stringify(JSONData.list, null, 4)}}</pre>
</template>
<script>
import { ref, reactive } from 'vue'
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
        '--gridGap': '1px',
        '--border': '1px solid red'
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
    const position = reactive({
      startX: 0,
      endX: 0,
      startY: 0,
      endY: 0
    })
    let lock = false
    const handleMouseDown = (e, item) => {
      console.log(e.target.parentElement.getBoundingClientRect())
      if (e.target.className !== 'resize') return
      e.target.parentNode.classList.add('isActive')
      lock = false
      position.startX = e.clientX
      position.startY = e.clientY
      console.log('>>>position.startX', position.startX)
      position.startY = e.clientY
      console.log('>>>', position.startY)

      document.onmousemove = (e) => {
        lock = true
        position.endX = e.clientX
        position.endY = e.clientY
        console.log('endY', position.endY)
        createElementDiv(e)
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        if (lock) {
          e.target.parentNode.classList.remove('isActive')
          if (document.querySelector('#_line')) {
            document.body.removeChild(document.querySelector('#_line'))
          }

          // 右侧拖拽
          const moveLengthX = position.endX - position.startX
          if (Math.abs(moveLengthX) > 15) {
            console.log('moveLength', moveLengthX)
            const moveCount = Math.abs(parseInt(moveLengthX / 50)) > 0 ? parseInt(moveLengthX / 50) : (moveLengthX > 0 ? 1 : -1)
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
          }
          // 右侧拖拽
          const moveLengthY = position.endY - position.startY
          if (Math.abs(moveLengthY) > 15) {
            console.log('moveLength>>>', moveLengthY)
            const moveCount = Math.abs(parseInt(moveLengthY / 50)) > 0 ? parseInt(moveLengthY / 50) : (moveLengthY > 0 ? 1 : -1)
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

    const createElementDiv = (e) => {
      if (document.querySelector('#_line')) {
        document.body.removeChild(document.querySelector('#_line'))
      } else {
        console.log(e)
        const cDiv = document.createElement('div')
        const parentElement = e.target.parentElement

        console.log('>>>parentElement.getBoundingClientRect()', parentElement.getBoundingClientRect())
        const moveLengthX = position.endX - position.startX
        const moveLengthY = position.endY - position.startY
        cDiv.style.position = 'fixed'
        // cDiv.style.left = e.clientX + 'px'
        // cDiv.style.top = e.clientY + 'px'
        // cDiv.style.height = '100px'
        // cDiv.style.width = '100px'
        cDiv.style.left = parentElement.getBoundingClientRect().x + 'px'
        cDiv.style.top = parentElement.getBoundingClientRect().y + 'px'
        cDiv.style.height = parentElement.getBoundingClientRect().height + moveLengthX + 'px'
        cDiv.style.width = parentElement.getBoundingClientRect().width + moveLengthY + 'px'
        cDiv.style.border = '10px dashed green'
        // cDiv.style.right = '1px dashed green'
        // cDiv.style.borderTop = '1px dashed green'
        cDiv.style.zIndex = '10'
        cDiv.id = '_line'
        document.body.appendChild(cDiv)
      }
    }

    return {
      handleMouseDown,
      JSONData
    }
  }
}
</script>
<style scoped lang="scss">
.isActive{
  border: 1px dashed yellowgreen;
}
.grid-container {
  width: 865px;
  user-select: none;
  display: grid;
  grid-template-columns: var(--gridTemplateColumns);
  grid-auto-columns: var(--gridAutoColumns);
  // 默认行高50px
  grid-auto-rows: var(--gridAutoRows);
  grid-gap: var(--gridGap);
  border: var(--border);
  background-color: red;
  >div{
    background-color: #fff;
    position: relative;
    >.resize{
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 10px;
      height: 10px;
      border-right: 2px solid #999;
      border-bottom: 2px solid #999;
      &:hover{
        color: red;
        cursor: nw-resize;
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
