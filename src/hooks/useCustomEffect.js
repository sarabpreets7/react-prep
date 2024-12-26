import { useRef } from "react";

export default function useCustomEffect(cb,deps){

    const isFirstRender = useRef(true);
    const prevDeps = useRef([]);


    if(isFirstRender.current){
        cb();
        isFirstRender.current = false;
    }

    const depsChanges = deps ? JSON.stringify(prevDeps.current) != JSON.stringify(deps):true;


if(depsChanges){
    cb()
}

prevDeps.current = deps || []

}