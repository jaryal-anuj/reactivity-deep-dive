import { Dep} from './reactivity.js'

export function createSignal(value){
    const dep = new Dep();
    const getter = ()=>{
        dep.track();
        return value;
    }

    const setter = (newValue) =>{
        value = newValue;
        dep.trigger();
    }
    return [getter, setter];
}