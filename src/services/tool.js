// 100%参照lodash,
const tool = {
    each(collection, iteratee) {
        // 区分是数组还是json对象或其他
        if(Array.isArray(collection)){
            var index = -1
            const length = collection === null ? 0 : collection.length
            while (++index < length) {
                if (iteratee(collection[index], index, collection) === false) {
                    break
                }
            }
            return collection
        }
        else{
            if(collection===null){
                return collection
            }
            if(!this.isArrayLike(collection)){ // 是对象{a:1}
                const props = Object.keys(collection)
                let { length } = props
                let index = -1
                while(length--){
                    const key = props[++index]
                    if (iteratee(collection[key], key, collection) === false) {
                        break
                    }
                }
                return collection
            }
        }
    },
    isArrayLike(value){
        return value != null && typeof value != 'function' && value.length
    },
    getRandom(){
        return new Date().getTime() + '_' + parseInt(Math.random() * 1000000)
    },
    test(fn,times=100000){
        console.time('hello')
        for(var i = 0;i<times;i++){
            fn()
        }
        console.timeEnd('hello')
    }
}

export default tool