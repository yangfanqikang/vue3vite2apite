interface action {
    label: string;
    prop: string,
    attrs?: object
}
// 操作类型
const init = [
    {prop: 'action1', label: '操作1'},
    {prop: 'action2', label: '操作2'}
]

const tHeader = [
    {prop: 'time', label: '时间', attrs: {width: 160}},
    {prop: 'type', label: '类型', attrs: {width: 100}},
    {prop: 'content', label: '公示内容'}
]

const ACTIONS = init.map(item => Object.assign(item, {attrs: { width: setWidth(item) }}));

const HEADERS = tHeader
// const HEADERS = tHeader.map(item => {
//     let attrs = {}
//     if (!autoWidthList.includes(item.prop)){
//         Reflect.set(attrs, 'width', setWidth(item))
//     }
//     console.log(attrs)
//     return Object.assign(item, {attrs})
//
// })
function setHeaderWidth(item: action,){
    return item.label.length * 40
}

function setWidth(item: action){
    return item.label.length * 40
}

export function getActions(arr: string[]){
    return ACTIONS.filter(item=>arr.includes(item.prop))
}

export function getTHeaders(arr: string[]){
    return HEADERS.filter(item=>arr.includes(item.prop))
}
