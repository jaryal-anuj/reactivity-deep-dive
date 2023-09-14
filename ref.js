import { Dep} from './reactivity.js'

export function ref(value){
    const dep = new Dep();
    return {
        get value(){
            dep.track();
            return value;
        },

        set value(newValue){
            value = newValue;
            dep.trigger();
        }
    }
}