import { Dep} from './reactivity.js'
function isPlainObject(value){
    return Object.prototype.toString.call(value) === '[object Object]';
}

const reactiveSet = new WeakSet();

export function reactive(obj){
    if(reactiveSet.has(obj)){
        return obj;
    }
    reactiveSet.add(obj);
    // if(obj.__isReactive){
    //     return obj;
    // }
    // Object.defineProperty(obj, '__isReactive', {
    //     enumerable:false,
    //     value:true
    // });

    Object.keys(obj).forEach(key=>{
        const dep = new Dep();
        let value = obj[key];
        Object.defineProperty(obj, key, {
            get(){
                dep.track();
                return isPlainObject(value) ? reactive(value) : value;
            },
            set (newValue){
                value = newValue;
                dep.trigger();
            }
        });
    });
    console.log(reactiveSet)
    return obj;
}