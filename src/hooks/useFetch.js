import {useState, useEffect} from 'react';



function useFetch(url){

    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [err,setErr] = useState(null);

    useEffect(()=>{

        setLoading(true);
        fetch(url).then(data=> data.json())
        .then(data=>{
            setData(data)
            setLoading(false)
        })
        .catch(err=>{
            setErr(err.message);
            setLoading(false)
        })
    },[url])


    return {data,err,loading}
}
export default useFetch;