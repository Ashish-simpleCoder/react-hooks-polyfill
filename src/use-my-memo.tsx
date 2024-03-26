import { useRef } from "react"

const DEP: any[] = []

type MyReturnType<T extends (...args: any[]) => unknown> = T extends (...args: any[]) => infer R ? R : never


export default function useMyMemo<T extends (() => unknown)>(value:T , dep = DEP):MyReturnType<T>{
    const isInitial = useRef(true)
    const cached_dep = useRef(dep)
    const cached_value = useRef<MyReturnType<T>>()
    
    // calculate value at first time
    if(isInitial.current){
        isInitial.current = false
        cached_value.current = value() as MyReturnType<T>
        return cached_value.current
    }
    
    // recalculate when dep is changed
    if(cached_dep.current != dep && dep.length > 0){
        cached_dep.current = dep
        cached_value.current =  value() as MyReturnType<T>
    }

    // return cached value
    return cached_value.current as MyReturnType<T>
}