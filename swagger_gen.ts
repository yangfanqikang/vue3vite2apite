const { codegen } = require('swagger-axios-codegen')
codegen({
    methodNameMode: 'operationId',
    remoteUrl:'http://localhost:8001/v2/api-docs'
})
