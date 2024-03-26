import { useRef } from "react"

const DEP: any[] = []

export default function useMyCallback<T extends (() => unknown)>(cb:T , dep = DEP):T{
    const cached_dep = useRef(dep)
    const cached_cb = useRef(cb)

    // update cached callback when dep is changed
    if(cached_dep.current != dep && dep.length > 0){
        cached_dep.current = dep
        cached_cb.current = cb
    }

    // return cached callback
    return cached_cb.current
}