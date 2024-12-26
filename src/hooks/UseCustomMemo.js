import { useEffect, useRef, useState } from "react";



// export default function useCustomMemo(cb,dependArr){
//     const [value,setValue] = useState(cb());
// // console.log(cb,dependArr);
//     useEffect(()=>{

//         console.log('ran useEffect');
//         setValue(cb());

//     },dependArr)

//     return value;
// }
const isSame =(prevDeps,newDeps)=>{
    if(prevDeps.length != newDeps.length){
        return false;
    }
    for(let i=0;i<prevDeps.length;i++){
        if(prevDeps[i] != newDeps[i]){
            return false;
        }
    }
    return true;
}

export default function useCustomMemo(cb,deps){

    const memoisedVal = useRef(null);

    if(!memoisedVal.current || !isSame(memoisedVal.current.deps,deps)){
        // console.log('ran change');
        memoisedVal.current = {
            value:cb(),
            deps:deps
        }
    }

    useEffect(()=>{
        return ()=>{
            memoisedVal.current = null;
        }
    },[])
   
    return memoisedVal.current.value;

}