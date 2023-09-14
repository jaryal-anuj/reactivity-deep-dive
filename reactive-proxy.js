import { Dep} from './reactivity.js'
function isPlainObject(value){
    return Object.prototype.toString.call(value) === '[object Object]';
}

const targetToPropertiesMap = new WeakMap();
function getDep(target, key){
    let properties = targetToPropertiesMap.get(target);
    if(!properties){
        properties = new Map();
        targetToPropertiesMap.set(target, properties);
    }
    let dep = properties.get(key);
    if(!dep){
        dep= new Dep();
        properties.set(key, dep)
    }
    return dep;
}


const handlers = {
    get(target, key){
        getDep(target, key).track();
        let value = target[key];
        return isPlainObject(value) ? reactive(value) : value;
    },
    set(target, key, value){
        target[key] =value;
        getDep(target, key).trigger();
        return true;
    }
}

const rawToProxyMap = new WeakMap()

export function reactive(obj){
    let proxy = rawToProxyMap.get(obj);
    if(!proxy){
        proxy = new Proxy(obj, handlers);
        rawToProxyMap.set(obj, proxy)
    }
    return proxy;
}