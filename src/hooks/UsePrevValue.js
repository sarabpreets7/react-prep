import {useState,useEffect} from 'react';


export default function UsePrevValue(param){


    const [prevValue,setPrevValue] = useState('');
    const [currValue,setCurrValue] = useState('');
  
  
    useEffect(()=>{


        setPrevValue(currValue);
        setCurrValue(param);

    },[param])


    return prevValue
  
  }