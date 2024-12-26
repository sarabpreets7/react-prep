import { useEffect, useRef, useState } from "react";



function useThrottle(value,delay){

    const [throttledVal,setThrottledVal] = useState(value);
    const lastTimeStamp = useRef(0)


    useEffect(()=>{

   
            const time = new Date().getTime();
            if((time - lastTimeStamp.current) >= delay){
                setThrottledVal(value);
                lastTimeStamp.current = time;
            }
    

     
    },[value,delay])



    return throttledVal;
}

export default useThrottle;