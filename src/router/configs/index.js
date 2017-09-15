import mainConfig from './main'
import exampleConfig from './example'
import adminConfig from './admin'

var env = process.env.NODE_ENV

let config = []
config = config.concat(mainConfig)

// 只有测试环境才添加examples文件夹中的页面
if(env==='development'){
    config = config.concat(exampleConfig)
    config = config.concat(adminConfig)
}

export default config