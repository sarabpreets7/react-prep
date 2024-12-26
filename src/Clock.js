import { useState, useEffect } from "react";


export default function Clock(){

    const [time,setTime] = useState('');


    useEffect(()=>{

       const interval =  setInterval(()=>{

            const dateObj = new Date();

            const hours = dateObj.getHours();
            const mins = dateObj.getMinutes();
            const seconds = dateObj.getSeconds();

            const newTime = `${hours} : ${mins} : ${seconds}`;
            setTime(newTime);
        },1000)


        return ()=>clearInterval(interval)
    },[])


    return(
        <div>
            <h2>{time}</h2>
        </div>
    )
}