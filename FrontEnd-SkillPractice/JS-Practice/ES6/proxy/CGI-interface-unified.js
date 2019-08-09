// -----------------解决CGI接口，后端接口调用函数重复封装问题-------------------

// 之前  重复封装api
let root = 'urlhostname'

function isNewUser(args) {
    return request({
        url: `${root}/is_new_user`,
        method: 'GET',
        params: {
            ...args,
        },
    });
}

function getList(args) {
    return request({
        url: `${root}/get_list`,
        method: 'GET',
        params: {
            ...args,
        },
    });
}

// 之后
function request(params) {
    // httpRequest
    return params
}

function applyConfig(config) {
    // 根据配置做一些事情
    // .....
    let {
        __host__
    } = config
    // 返回一个包含Api配置列 Proxy  
    // 只需要调用配置项中的key即可获得  相应接口函数
    return new Proxy({}, {
        get(target, name) {
            const _name_ = toLine(name);
            return (args) => request({
                url: `${__host__}/${_name_}`,
                // 默认配置
                // ...defaultSetting,
                method: config[name].method,
                params: {
                    ...args,
                },
            });
        },
    });
}

let apiConfigs = {
    __host__: 'urlhostname',
    isNewUser: {
        method: 'GET',
        // 其他配置
    },
    getList: {
        method: 'POST',
    },
}
const simpleCGI = applyConfig(apiConfigs)

console.log(simpleCGI.isNewUser({
    a: '参数呦呦呦'
}))
console.log(simpleCGI.getList({
    a: '参数哈哈哈'
}))