let currentActiveEffect;

export class Dep{
    subs = new Set();
    constructor(value){
        this._value = value;
    }

    get value(){
        this.track();
        return this._value;
    }

    set value(newValue){
        this._value = newValue;
        this.trigger();
    }

    track(){
        if(currentActiveEffect){
            this.subs.add(currentActiveEffect);
        }
    }

    trigger(){
        this.subs.forEach(sub=>sub());
    }
}

export function effect(update){
    const wrappedUpdate = ()=>{
        currentActiveEffect = update;
        try{
            update();
        }finally{
            currentActiveEffect = null;
        }
        
        currentActiveEffect = null;
    }

    wrappedUpdate();
}