const dynamicViewsModules = import.meta.glob('../duban/**/*.{vue,tsx}')

function install(app: any){
    for (const path in dynamicViewsModules) {
        const name = (<string>path.split('/').pop()).replace('.vue','')
        dynamicViewsModules[path]().then(res=>{
            app.component(name, res.default)
        })

    }
}

export default {
    install
}
