// 字体图标 url
const cssCdnUrlList: Array<string> = [
    '//at.alicdn.com/t/font_2298093_n459lh5kpoh.css',
    '//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
]
// 第三方 js url
const jsCdnUrlList: Array<string> = [
    'https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.8.1/dist/g6.min.js',
    'https://cdn.bootcdn.net/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'
]

// 动态设置字体图标
export function setCssCdn() {
    if (cssCdnUrlList.length <= 0) return false
    cssCdnUrlList.map(v => {
        let link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = v
        link.crossOrigin = 'anonymous'
        document.getElementsByTagName('head')[0].appendChild(link)
    })
}

// 批量设置第三方js
export function setJsCdn() {
    if (jsCdnUrlList.length <= 0) return false
    jsCdnUrlList.map(v => {
        let link = document.createElement('script')
        link.src = v
        document.body.appendChild(link)
    })
}

// 设置执行函数
const setIntroduction = {
    cssCdn: () => {
        setCssCdn()
    },
    jsCdn: () => {
        setJsCdn()
    }
}

// 导出函数方法
export default setIntroduction